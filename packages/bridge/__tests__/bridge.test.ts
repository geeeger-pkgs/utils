/* eslint-disable no-underscore-dangle */
import {
    Bridge, BridgeType, DealType,
} from '../src/index';

declare global {
    interface Window {
        [key: string]: any;
    }
}

describe('test instance method/properties', () => {
    let myBridge: Bridge;
    beforeEach(() => {
        myBridge = new Bridge();
    });

    afterEach(() => {
        delete window.test1;
        delete window.WVJBCallbacks;
        delete window.WebViewJavascriptBridge;
    });

    test('android callback stack', () => {
        expect.assertions(2);
        myBridge.pushCallbackStack('test', () => {});
        expect(myBridge.getCallbackStack('test')).toHaveLength(1);
        myBridge.removeCallbackStack('test');
        expect(myBridge.getCallbackStack('test')).toHaveLength(0);
    });

    test('getUserAgent()', () => {
        expect(myBridge.getUserAgent()).toBe(window.navigator.userAgent);
    });

    test('alias() throw error if bridge method does not exist', () => {
        expect(() => {
            myBridge.alias('test1', 'test2');
        }).toThrow();
    });

    test('alias() throw error if alias already exist', () => {
        myBridge.test1 = function test() {};
        expect(() => {
            myBridge.alias('test2', 'test1');
        }).toThrow();
    });

    test('set alias success', () => {
        myBridge.test1 = function test() {};
        jest.spyOn(myBridge, 'test1');
        myBridge.alias('test1', 'test2');
        myBridge.test2();
        expect(myBridge.test1).toHaveBeenCalled();
    });

    test('regist()', () => {
        expect.assertions(2);
        myBridge.isIOS = true;
        jest.spyOn(myBridge, 'registIOSCallHandler');
        myBridge.regist(BridgeType.notice, 'test', 'test', DealType.origin);
        expect(myBridge.registIOSCallHandler).toHaveBeenCalled();
        myBridge.isIOS = false;
        jest.spyOn(myBridge, 'registAndroidCallHandler');
        myBridge.regist(BridgeType.notice, 'test1', 'test1', DealType.origin);
        expect(myBridge.registAndroidCallHandler).toHaveBeenCalled();
    });

    test('throw error if bridge exist', () => {
        myBridge.registAndroidCallHandler(BridgeType.sync, 'test1');
        expect(() => {
            myBridge.registAndroidCallHandler(BridgeType.sync, 'test1');
        }).toThrow();
    });

    test('registerHandler()', () => {
        expect.assertions(2);
        myBridge.isIOS = true;
        jest.spyOn(myBridge, 'registIOSRegisterHandler');
        myBridge.registerHandler('test1', () => {});
        expect(myBridge.registIOSRegisterHandler).toHaveBeenCalled();
        myBridge.isIOS = false;
        jest.spyOn(myBridge, 'registAndroidRegisterHandler');
        myBridge.registerHandler('test1', () => {});
        expect(myBridge.registAndroidRegisterHandler).toHaveBeenCalled();
    });

    test('registAndroidRegisterHandler()', () => {
        const fn = jest.fn();
        myBridge.registAndroidRegisterHandler('test1', fn);
        expect(window.test1).toBe(fn);
    });

    test('registIOSRegisterHandler()', () => {
        expect.assertions(3);
        myBridge.registIOSRegisterHandler('test', jest.fn());
        myBridge.registIOSRegisterHandler('test1', jest.fn());
        expect(window.WVJBCallbacks).toHaveLength(2);
        expect(document.querySelector('iframe')).toBeTruthy();
        const stack: any = {};
        window.WebViewJavascriptBridge = {
            registerHandler: jest.fn(),
            callHandler(name: string, data: any, callback: any): void {
                if (!stack[name]) {
                    stack[name] = [];
                }
                stack[name].push(callback);
            },
            disableJavscriptAlertBoxSafetyTimeout(): void {},
            _fetchQueue(): void {},
            _handleMessageFromObjC(): void {},
        };
        myBridge.registIOSRegisterHandler('test2', jest.fn());
        expect(window.WebViewJavascriptBridge.registerHandler).toHaveBeenCalled();
    });

    test('registIOSCallHandler() throw error', () => {
        myBridge.registIOSCallHandler('test1');
        expect(() => {
            myBridge.registIOSCallHandler('test1');
        }).toThrow();
    });

    test('registIOSCallHandler() called', async () => {
        expect.assertions(1);
        window.WebViewJavascriptBridge = {
            registerHandler: () => {},
            callHandler(name: string, data: any, callback: any): void {
                callback(true);
            },
            disableJavscriptAlertBoxSafetyTimeout(): void {},
            _fetchQueue(): void {},
            _handleMessageFromObjC(): void {},
        };
        myBridge.registIOSCallHandler('test1');
        await expect(myBridge.test1()).resolves.toBe(true);
    });
});

describe('test registAndroidCallHandler', () => {
    let myBridge: Bridge;
    beforeEach(() => {
        myBridge = new Bridge();
    });

    afterEach(() => {
        delete window.test1;
        delete window.control;
    });

    test('throw error if bridge called that window.control does not exist', async () => {
        expect.assertions(1);
        myBridge.registAndroidCallHandler(BridgeType.sync, 'test1', DealType.origin);
        await expect(myBridge.test1()).rejects.toThrow();
    });

    test('throw error if bridge called that window.control[method] does not exist', async () => {
        expect.assertions(1);
        myBridge.registAndroidCallHandler(BridgeType.async, 'test1', 'test1');
        window.control = {};
        await expect(myBridge.test1()).rejects.toThrow();
    });

    test('notice', async () => {
        expect.assertions(1);
        myBridge.registAndroidCallHandler(BridgeType.notice, 'test1');
        window.control = {
            test1 (a: any) {
                return a;
            },
        };
        await expect(myBridge.test1(1)).resolves.toBe(1);
    });

    test('sync with json handled', async () => {
        expect.assertions(1);
        myBridge.registAndroidCallHandler(BridgeType.sync, 'test1', DealType.json);
        window.control = {
            test1 (a: any) {
                return a;
            },
        };
        await expect(myBridge.test1({ a: 1 })).resolves.toEqual({ a: 1 });
    });

    test('sync with origin handled', async () => {
        expect.assertions(1);
        myBridge.registAndroidCallHandler(BridgeType.sync, 'test1');
        window.control = {
            test1 () {
                return '1';
            },
        };
        await expect(myBridge.test1()).resolves.toBe('1');
    });

    test('sync with broken json', async () => {
        expect.assertions(1);
        myBridge.registAndroidCallHandler(BridgeType.sync, 'test1', DealType.json);
        window.control = {
            test1 () {
                return '{a:1';
            },
        };
        await expect(myBridge.test1()).rejects.toThrow();
    });

    test('async with json', async () => {
        expect.assertions(1);
        myBridge.registAndroidCallHandler(BridgeType.async, 'test1', 'test1', DealType.json);
        window.control = {
            test1 () {
                setTimeout(() => {
                    window.test1('{"a":1}');
                }, 50);
            },
        };
        await expect(myBridge.test1()).resolves.toEqual({ a: 1 });
    });

    test('async with broken json', async () => {
        expect.assertions(1);
        myBridge.registAndroidCallHandler(BridgeType.async, 'test1', 'test1', DealType.json);
        window.control = {
            test1 () {
                setTimeout(() => {
                    window.test1('{"a":');
                }, 50);
            },
        };
        await expect(myBridge.test1()).rejects.toThrow();
    });

    test('async with origin data', async () => {
        expect.assertions(1);
        myBridge.registAndroidCallHandler(BridgeType.async, 'test1', 'test1', DealType.origin);
        window.control = {
            test1 () {
                setTimeout(() => {
                    window.test1('{a:1');
                }, 50);
            },
        };
        await expect(myBridge.test1()).resolves.toBe('{a:1');
    });
});
