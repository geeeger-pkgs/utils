import { isArray, isJson } from '@geeeger/is';

type key = 'sessionStorage' | 'localStorage';

interface IsetItemObject {
    key: string;
    value: any;
}

interface IgetItemObject {
    key: string;
    value: any;
}

interface IremoveObject {
    key: string;
    value: any;
}

class QieStorage {
    public static qSetItem(key: key, setKey: string, setValue: any): IsetItemObject {
        let newValue = setValue;
        if (typeof setValue === 'object' || isArray(setValue)) {
            newValue = JSON.stringify(setValue);
        }

        window[key].setItem(setKey, newValue);

        return {
            key: setKey,
            value: newValue,
        };
    }

    public static qGetItem(key: key, getKet: string): IgetItemObject {
        let value: string|null = window[key].getItem(getKet);

        if (value !== null && isJson(value)) {
            value = JSON.parse(value);
        }

        return {
            key: getKet,
            value,
        };
    }

    public static qRemoveItem(key: key, removeKey: string): IremoveObject {
        const tmpValue = this.qGetItem(key, removeKey).value;

        window[key].clear();

        return {
            key: removeKey,
            value: tmpValue,
        };
    }
}

export default QieStorage;
