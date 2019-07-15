enum DataType {
    String,
    Number,
    Boolean,
    Undef,
    Null
}

function defaultValue(type: DataType) {
    if (type === DataType.Boolean) {
        return false;
    }
    if (type === DataType.Null) {
        return null;
    }
    if (type === DataType.Number) {
        return 0;
    }
    if (type === DataType.String) {
        return '';
    }
    if (type === DataType.Undef) {
        return undefined;
    }
    return undefined;
}
export default class Nesting {
    data: any;

    constructor(nestObject = {}) {
        this.data = nestObject;
    }

    static DataType = DataType;

    get(path?: string, type: DataType = DataType.String) {
        if (typeof path === 'undefined') {
            return this.data;
        }
        return this.walk(path.split('.'), this.data, type);
    }

    private walk(path: string[], ret: any, type: DataType): any {
        if (ret === undefined) {
            return defaultValue(type);
        }
        if (!path.length) {
            return ret;
        }
        const next = path.shift();
        if (next === undefined) {
            return defaultValue(type);
        }
        return this.walk(path, ret[next], type);
    }
}
