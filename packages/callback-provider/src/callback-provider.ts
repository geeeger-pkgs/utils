type Callback = (data: any) => void | Function
export default class CallbackStackProvider {
    callbackStack: any;

    scope: any;

    constructor(scope: any = {}) {
        this.callbackStack = {};
        this.scope = scope;
    }

    /**
     * 移除callbackstack
     * @param callbackName
     */
    removeCallbackStack(callbackName: string) {
        if (!this.callbackStack[callbackName]) {
            return;
        }
        delete this.callbackStack[callbackName];
    }

    /**
     * 获取callbackstack
     * @param callbackName
     */
    getCallbackStack(callbackName: string): Callback[] {
        if (!this.callbackStack[callbackName]) {
            return [];
        }
        return this.callbackStack[callbackName];
    }

    /**
     * 增加callback监听
     * @param callbackName
     * @param callback
     */
    pushCallbackStack(callbackName: string, callback: Callback) {
        if (!this.callbackStack[callbackName]) {
            this.callbackStack[callbackName] = [];
        }
        this.callbackStack[callbackName].push(callback);
    }

    listen(callbackName: string) {
        if (callbackName && !this.scope[callbackName]) {
            this.scope[callbackName] = (response: any) => {
                delete this.scope[callbackName];
                this.getCallbackStack(callbackName).forEach((cb) => {
                    cb(response);
                });
                this.removeCallbackStack(callbackName);
            };
        }
    }

    run(callbackName: string, ...args: any[]) {
        if (callbackName && this.scope[callbackName]) {
            this.scope[callbackName].apply(null, args);
        }
    }
}
