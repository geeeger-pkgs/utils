import LinkedList from './linkedlist';

class Entry {
    key: any;
    value: any;
    hashcode: any;
    constructor(key: any, value: any, hashcode: number) {
        this.key = key;
        this.value = value;
        this.hashcode = hashcode;
    }

    getKey() {
        return this.key;
    }

    getValue() {
        return this.value;
    }

    getHashCode() {
        return this.hashcode;
    }

    setHashCode(hashcode: number) {
        this.hashcode = hashcode;
    }

    toString() {
        return `${this.key}=${this.value}`;
    }
}

const OVERFLOW = 0x7fffffff;

function hashCode(key: any) {
    let keyStr = key.toString();
    let hash = 0;
    let offset = 0;
    let len = keyStr.length;
    for (let i = 0; i < len; i++) {
        hash = 31 * hash + keyStr.charCodeAt(offset++);
        if (hash >= OVERFLOW) {
            hash %= (OVERFLOW + 1);
        }
    }
    return hash
}

export default class HashMap {
    private _capacity: number;
    private _tableSize: number;
    private _size: number;
    private _resizeRatio: number;
    private _table: any[];
    constructor() {
        this._capacity = 32;
        this._tableSize = 0;
        this._size = 0;
        this._resizeRatio = 0.5;
        this._table = new Array(this._capacity);
    }

    get size() {
        return this._size;
    }

    get tableSize() {
        return this._tableSize;
    }

    private _hashFunction(key: any) {
        return hashCode(key) & (this._capacity - 1);
    }

    put(key: any, value: any) {
        if (this._tableSize / this._capacity > this._resizeRatio) {
            this._resize();
        }

        this.remove(key);

        let entry = new Entry(key, value, this._hashFunction(key));

        if (!this._table[entry.getHashCode()]) {
            this._table[entry.getHashCode()] = new LinkedList();
            this._tableSize++;
        }
        this._table[entry.getHashCode()].add(entry);
        this._size++;
    }

    private _resize() {
        this._capacity = this._capacity * 2;
        let arr = new Array(this._capacity);
        this._tableSize = 0;
        this._table
            .filter((item) => item !== undefined)
            .forEach((item: LinkedList) => {
                Array.from(item)
                    .forEach((e: Entry) => {
                        e.setHashCode(this._hashFunction(e.getKey()));
                        if (!arr[e.getHashCode()]) {
                            arr[e.getHashCode()] = new LinkedList();
                            this._tableSize++;
                        }
                        arr[e.getHashCode()].add(e);
                    })
            });
        this._table = arr;
    }

    contains(key: any) {
        let hashCode = this._hashFunction(key);
        if (hashCode >= this._table.length || this._size <= 0) {
            return false;
        }
        let list: LinkedList = this._table[hashCode];
        if (!list) {
            return false;
        }
        return Array.from(list).filter((item: Entry) => item.getKey() === key).length > 0;
    }

    remove(key: any) {
        let hashCode = this._hashFunction(key);
        if (hashCode >= this._table.length || this._size <= 0) {
            return false;
        }
        let list: LinkedList = this._table[hashCode];
        if (!list) {
            return false;
        }
        list.removeIf((item: Entry) => item.getKey() === key);
        if (list.isEmpty()) {
            this._tableSize--;
            this._table[hashCode] = undefined;
        }
        this._size--;
    }

    get(key: any) {
        let hashCode = this._hashFunction(key);
        if (hashCode >= this._table.length || this._size <= 0) {
            return null;
        }
        let list: LinkedList = this._table[hashCode];
        if (!list) {
            return null;
        }
        return Array.from(list)
            .filter((item) => item.getKey() === key)
            .map((item) => item.getValue())[0] || null;
    }
};
