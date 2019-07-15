import BridgeError from './error';

type AndroidBridgeCallback = (data?: any) => void;

type registerHandlerCallback = (arg1?: any) => void;
type callHandlerCallback = (arg1?: any) => void;

interface BridgeIOS {
    registerHandler: (handlerName: string, handler: registerHandlerCallback) => void;
    callHandler: (handlerName: string, data: any, reponseCallback: callHandlerCallback) => void;
    disableJavscriptAlertBoxSafetyTimeout: () => void;
    _fetchQueue: () => string;
    _handleMessageFromObjC: (messageJSON: string) => void;
}

type setupBridgeCallback = (bridge: BridgeIOS) => void;

declare global {
    interface Window {
        [key: string]: any;
    }
}

/**
 * 通知ios并向页面注入WebViewJavascriptBridge的初始化方法
 * @param callback
 */
function setupWebViewJavascriptBridge(callback: setupBridgeCallback): any {
    if (window.WebViewJavascriptBridge) {
        return callback(window.WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    const WVJBIframe: HTMLIFrameElement = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => {
        document.documentElement.removeChild(WVJBIframe);
    }, 0);
    return undefined;
}

export enum DealType {
    origin,
    json,
}

export enum BridgeType {
    async,
    sync,
    notice,
}

export class Bridge {
    static DealType = DealType;

    static BridgeType = BridgeType;

    static Promise = Promise;

    ua: string;

    private androidCallbackStack: any;

    isIOS: boolean;

    [key: string]: any;

    constructor() {
        this.ua = window.navigator.userAgent;
        this.isIOS = /i(phone|pad|pod|os)/i.test(this.ua);
        this.androidCallbackStack = {};
    }

    /**
     * 移除安卓callbackstack
     * @param callbackName
     */
    removeCallbackStack(callbackName: string) {
        if (!this.androidCallbackStack[callbackName]) {
            return;
        }
        delete this.androidCallbackStack[callbackName];
    }

    /**
     * 获取安卓callbackstack
     * @param callbackName
     */
    getCallbackStack(callbackName: string): AndroidBridgeCallback[] {
        if (!this.androidCallbackStack[callbackName]) {
            return [];
        }
        return this.androidCallbackStack[callbackName];
    }

    /**
     * 增加安卓callback监听
     * @param callbackName
     * @param callback
     */
    pushCallbackStack(callbackName: string, callback: AndroidBridgeCallback) {
        if (!this.androidCallbackStack[callbackName]) {
            this.androidCallbackStack[callbackName] = [];
        }
        this.androidCallbackStack[callbackName].push(callback);
    }

    /**
     * 获取userAgent
     */
    getUserAgent() {
        return this.ua;
    }

    /**
     * 为bridge设置别名
     * @param bridgeName
     * @param alias
     */
    alias(bridgeName: string, alias: string): this {
        if (alias in this) {
            throw new BridgeError(`alias:${alias} already exists`);
        }
        if (!(bridgeName in this)) {
            throw new BridgeError(`bridge:${bridgeName} does not exists`);
        }
        this[alias] = this[bridgeName];
        return this;
    }

    /**
     * 注册一个bridge api
     * @param bridgeType
     * @param bridgeName
     * @param callbackName
     * @param dealType
     */
    regist(
        bridgeType: BridgeType,
        bridgeName: string,
        callbackName?: string | DealType,
        dealType?: DealType
    ): this {
        if (this.isIOS) {
            return this.registIOSCallHandler(bridgeName);
        }
        return this.registAndroidCallHandler(bridgeType, bridgeName, callbackName, dealType);
    }

    /**
     * 注册一个ios bridge api
     * @param bridgeName
     */
    registIOSCallHandler(bridgeName: string): this {
        if (bridgeName in this) {
            throw new BridgeError(`method:${bridgeName} already exists`);
        }
        this[bridgeName] = (data: any = {}) => new Bridge.Promise((resolve) => {
            setupWebViewJavascriptBridge((bridge: BridgeIOS) => {
                bridge.callHandler(bridgeName, data, (response: any) => {
                    resolve(response);
                });
            });
        });
        return this;
    }

    /**
     * 注册一个安卓 bridge api
     * @param bridgeType
     * @param bridgeName
     * @param callbackName
     * @param dealType
     */
    registAndroidCallHandler(
        bridgeType: BridgeType,
        bridgeName: string,
        cbname?: string | DealType,
        dtype?: DealType
    ): this {
        let dealType = dtype;
        let callbackName = cbname;
        if (typeof cbname === 'string') {
            dealType = dtype || DealType.origin;
        }

        if (typeof callbackName === 'number') {
            dealType = callbackName;
            callbackName = bridgeName;
        }

        if (typeof callbackName === 'undefined') {
            dealType = dtype || DealType.origin;
            callbackName = bridgeName;
        }

        if (bridgeName in this) {
            throw new BridgeError(`method:${bridgeName} already exists`);
        }
        this[bridgeName] = (sendData?: any) => new Bridge.Promise((resolve, reject) => {
            let data = sendData;
            if (!window.control) {
                reject(new BridgeError('window.control does not exists'));
            }
            if (!window.control[bridgeName]) {
                reject(new BridgeError(`bridge:${bridgeName} api does not exists`));
            }
            if (bridgeType === BridgeType.async) {
                this.pushCallbackStack(callbackName as string, (response: any) => {
                    let result = response;
                    try {
                        switch (dealType) {
                        case DealType.json:
                            result = JSON.parse(result);
                            break;
                        case DealType.origin:
                        default:
                            break;
                        }
                    } catch (e) {
                        reject(new BridgeError(`parse bridge async data error: ${e.message}`));
                    }
                    resolve(result);
                });
                if (callbackName && !window[callbackName]) {
                    window[callbackName] = (response: any) => {
                        delete window[callbackName as string];
                        this
                            .getCallbackStack(callbackName as string)
                            .forEach((cb: AndroidBridgeCallback) => {
                                cb(response);
                            });
                        this.removeCallbackStack(callbackName as string);
                    };
                }
            }
            if (typeof data === 'object') {
                data = JSON.stringify(data);
            }
            let result: any;

            // 兼容android方法的实现
            // 若无参数，不传值，
            // 要不然native方法可能报 method undefined
            if (data !== undefined) {
                result = window.control[bridgeName](data);
            } else {
                result = window.control[bridgeName]();
            }

            if (bridgeType === BridgeType.notice) {
                resolve(result);
            }
            if (bridgeType === BridgeType.sync) {
                try {
                    switch (dealType) {
                    case DealType.json:
                        result = JSON.parse(result);
                        break;
                    case DealType.origin:
                    default:
                        break;
                    }
                } catch (e) {
                    reject(new BridgeError(`parse bridge sync data error: ${e.message}`));
                }
                resolve(result);
            }
        });
        return this;
    }

    /**
     * 注册一个由native主动调用的js方法
     * @param handlerName
     * @param handler
     */
    registerHandler(handlerName: string, handler: registerHandlerCallback): this {
        if (this.isIOS) {
            return this.registIOSRegisterHandler(handlerName, handler);
        }
        return this.registAndroidRegisterHandler(handlerName, handler);
    }

    /**
     * 注册一个由ios主动调用的js方法
     * @param handlerName
     * @param handler
     */
    registIOSRegisterHandler(handlerName: string, handler: registerHandlerCallback): this {
        setupWebViewJavascriptBridge((bridge: BridgeIOS) => {
            bridge.registerHandler(handlerName, handler);
        });
        return this;
    }

    /**
     * 注册一个由安卓主动调用的js方法
     * @param handlerName
     * @param handler
     */
    registAndroidRegisterHandler(handlerName: string, handler: registerHandlerCallback): this {
        window[handlerName] = handler;
        return this;
    }
}
