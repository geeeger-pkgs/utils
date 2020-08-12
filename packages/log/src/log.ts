export interface Config {
    send: boolean;
    transfer: boolean;
}

export interface BaseConfig {
    print: boolean;
}

export type LogConfigType = Config & BaseConfig & {
    id?: any;
};

export interface LogCacheList {
    error?: any[];
    warn?: any[];
    info?: any[];
    debug?: any[];
}

/**
 * 全局配置
 */
const config: Config = {
    // 是否将数据发送到服务端
    send: false,
    // 是否允许模块数据共享
    transfer: false,
};
/**
 * log个性化配置
 */
const baseConfig: BaseConfig = {
    // 是否打印log
    print: true,
};

export enum LogType {
    // 打印类型为错误
    error,
    // 打印类型为警告
    warn,
    // 打印类型为信息
    info,
    // 打印类型为debug
    debug
}

export class Log {
    errorCache?: any[]

    warnCache?: any[]

    infoCache?: any[]

    debugCache?: any[]

    config?: LogConfigType

    constructor(id: any, userConfig?: any) {
        this.init(id, userConfig);
    }

    public init(id: any, userConfig?: any): void {
        this.errorCache = [];
        this.warnCache = [];
        this.infoCache = [];
        this.debugCache = [];
        this.config = { ...baseConfig, ...config, ...userConfig };
        (this.config as LogConfigType).id = id;
    }

    private print(type: LogType | any, args: any[]): void {
        const thisConfig: LogConfigType = this.config as LogConfigType;

        if (!thisConfig.print || !window.console) {
            return;
        }

        switch (type) {
        case LogType.error:
            console.error(args);
            break;
        case LogType.warn:
            console.warn(args);
            break;
        case LogType.info:
            console.info(args);
            break;
        case LogType.debug:
            console.debug(args);
            break;
        default:
            console.log(args);
            break;
        }
    }

    public error(...args: any[]): void {
        (this.errorCache as any[]).push(args);
        this.print(LogType.error, args);
    }

    public warn(...args: any[]): void {
        (this.warnCache as any[]).push(args);
        this.print(LogType.warn, args);
    }

    public info(...args: any[]): void {
        (this.infoCache as any[]).push(args);
        this.print(LogType.info, args);
    }

    public debug(...args: any[]): void {
        (this.debugCache as any[]).push(args);
        this.print(LogType.debug, args);
    }

    public list(): LogCacheList {
        return {
            error: this.errorCache,
            warn: this.warnCache,
            info: this.infoCache,
            debug: this.debugCache,
        };
    }

    // send和transfer方法暂不实现
    // private _send(args: any[]) {
    //     const thisConfig = this.config as LogConfigType;
    //     if (thisConfig.send) {
    //         // todo

    //     }
    // }
}

const logCache: any[] = [];

export interface LogCache {
    id: string;
    log: Log;
}

export type ConditionFunction = (index: number, oneLogCache: LogCache) => boolean;

/**
 * 该函数实现对log缓存的迭代，如果符合ConditionFunction执行为false，
 * 停止迭代
 * @param fn
 */
function logEach(fn: ConditionFunction) {
    for (let i = 0; i < logCache.length; i += 1) {
        const element: LogCache = logCache[i];
        if (fn(i, element) === false) {
            break;
        }
    }
}

function logGet(id: string): LogCache | undefined {
    let cache;
    logEach((_, oneLogCache) => {
        if (id === oneLogCache.id) {
            cache = oneLogCache;
            return false;
        }
        return true;
    });
    return cache;
}

function logExist(id: string): boolean {
    return !!logGet(id);
}

function logAdd(id: string, log: Log) {
    if (!logExist(id)) {
        logCache.push({
            id,
            log,
        });
    }
}

// 通过测试我们知道这个方法有问题
// 我们预期从logCache里找不到这个实例，但是找到了
// 看代码发现我们只找了出来没删了他，这就是问题所在
function logRemove(id: string): LogCache | undefined {
    let cache;
    logEach((index, oneLog) => {
        if (id === oneLog.id) {
            cache = oneLog;
            // 删除该实例
            logCache.splice(index, 1);
            return false;
        }
        return true;
    });

    return cache;
}

function logMake(id: string, userConfig?: LogConfigType): Log {
    const log = new Log(id, userConfig);
    logAdd(id, log);
    return log;
}

// 刚刚意外了，由于我们需要在测试中指定一些类型，所以需要把类型也export出来进行使用，所以
// 更改一下export

export const create = logMake;
export const remove = logRemove;
export const get = logGet;
export const isExist = logExist;
export const fly = logGet;
