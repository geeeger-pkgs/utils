const ErrorName = 'BridgeError';

export default class BridgeError extends Error {
    /**
     * 名字
     */
    name: string;

    constructor(message?: string) {
        super(message);
        this.name = ErrorName;
    }
}
