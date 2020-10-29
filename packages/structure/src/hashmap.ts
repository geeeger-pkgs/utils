/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-bitwise */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-classes-per-file */
import LinkedList from './linkedlist';

class Entry<T = any> {
  key: any;

  value: T;

  hashcode: any;

  constructor(key: any, value: any, hashcode: number) {
    this.key = key;
    this.value = value;
    this.hashcode = hashcode;
  }

  getKey(): any {
    return this.key;
  }

  getValue(): any {
    return this.value;
  }

  getHashCode(): number {
    return this.hashcode;
  }

  setHashCode(hashcode: number): void {
    this.hashcode = hashcode;
  }

  toString(): string {
    return `${this.key}=${this.value}`;
  }
}

const OVERFLOW = 0x7fffffff;

function hashCode(key: any): number {
  const keyStr = key.toString();
  let hash = 0;
  let offset = 0;
  const len = keyStr.length;
  for (let i = 0; i < len; i += 1) {
    hash = 31 * hash + keyStr.charCodeAt(offset);
    offset += 1;
    if (hash >= OVERFLOW) {
      hash %= OVERFLOW + 1;
    }
  }
  return hash;
}

export default class HashMap<T = any> {
  private _capacity: number;

  private _tableSize: number;

  private _size: number;

  private _resizeRatio: number;

  private _table: Array<LinkedList<Entry<T>> | undefined>;

  constructor() {
    this._capacity = 32;
    this._tableSize = 0;
    this._size = 0;
    this._resizeRatio = 0.5;
    this._table = new Array(this._capacity);
  }

  get size(): number {
    return this._size;
  }

  get tableSize(): number {
    return this._tableSize;
  }

  put(key: any, value: T): void {
    if (this._tableSize / this._capacity > this._resizeRatio) {
      this._resize();
    }

    this.remove(key);

    const entry = new Entry<T>(key, value, this._hashFunction(key));

    if (!this._table[entry.getHashCode()]) {
      this._table[entry.getHashCode()] = new LinkedList();
      this._tableSize += 1;
    }
    (this._table[entry.getHashCode()] as LinkedList<Entry<T>>).add(entry);
    this._size += 1;
  }

  contains(key: any): boolean {
    const hashcode = this._hashFunction(key);
    if (hashcode >= this._table.length || this._size <= 0) {
      return false;
    }
    const list = this._table[hashcode];
    if (!list) {
      return false;
    }
    return Array.from(list).filter((item: Entry) => item.getKey() === key).length > 0;
  }

  remove(key: any): any {
    const hashcode = this._hashFunction(key);
    if (hashcode >= this._table.length || this._size <= 0) {
      return false;
    }
    const list = this._table[hashcode];
    if (!list) {
      return false;
    }
    list.removeIf((item: Entry) => item.getKey() === key);
    if (list.isEmpty()) {
      this._tableSize -= 1;
      this._table[hashcode] = undefined;
    }
    this._size -= 1;
    return undefined;
  }

  get(key: any): any {
    const hashcode = this._hashFunction(key);
    if (hashcode >= this._table.length || this._size <= 0) {
      return null;
    }
    const list = this._table[hashcode];
    if (!list) {
      return null;
    }
    return (
      Array.from(list)
        .filter((item) => item.getKey() === key)
        .map((item) => item.getValue())[0] || null
    );
  }

  private _hashFunction(key: any): any {
    return hashCode(key) & (this._capacity - 1);
  }

  private _resize(): void {
    this._capacity = this._capacity * 2;
    const arr = new Array(this._capacity);
    this._tableSize = 0;
    this._table
      .filter((item) => item !== undefined)
      .forEach((item) => {
        Array.from(item as LinkedList<Entry<T>>).forEach((e: Entry) => {
          e.setHashCode(this._hashFunction(e.getKey()));
          if (!arr[e.getHashCode()]) {
            arr[e.getHashCode()] = new LinkedList();
            this._tableSize += 1;
          }
          arr[e.getHashCode()].add(e);
        });
      });
    this._table = arr;
  }
}
