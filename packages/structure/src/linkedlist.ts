/* eslint-disable @typescript-eslint/no-explicit-any */
import Node from './node';

export default class LinkedList<T = any> {
  root: Node | null;

  length: number;

  constructor(root: Node | null = null) {
    this.root = root;
    this.length = root ? 1 : 0;
  }

  [Symbol.iterator](): Iterator<T> {
    let current = this.root;
    return {
      next(): IteratorResult<T> {
        if (current) {
          const value = current.getValue();
          current = current.left;
          return {
            done: false,
            value,
          };
        }
        return {
          done: true,
          value: undefined,
        };
      },
    };
  }

  add(element: T): void {
    if (this.root === null) {
      this.root = new Node(element, null);
    } else {
      this.root = new Node(element, this.root);
    }
    this.length += 1;
  }

  edit(target: T, updateTo: T): boolean {
    if (this.remove(target)) {
      this.add(updateTo);
      return true;
    }
    return false;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  removeFirst(): T | null {
    if (this.root === null) {
      return null;
    }
    const element = this.root.getValue();
    this.root = this.root.left;
    this.length -= 1;
    return element;
  }

  removeIf(callback: { (item: T): boolean }): boolean {
    if (this.root === null) {
      return false;
    }
    if (callback(this.root.getValue())) {
      this.root = this.root.left;
      this.length -= 1;
      return true;
    }
    let current = this.root.left;
    let previous = this.root;

    while (current !== null) {
      if (callback(current.getValue())) {
        previous.left = current.left;
        this.length -= 1;
        return true;
      }
      previous = current;
      current = current.left;
    }
    return false;
  }

  remove(element: T): boolean {
    return this.removeIf((item) => item === element);
  }

  search(element: T): boolean {
    let current = this.root;
    while (current !== null) {
      if (current.getValue() === element) {
        return true;
      }
      current = current.left;
    }
    return false;
  }

  stream(): T[] {
    const stream: T[] = [];
    if (this.root === null) {
      return stream;
    }
    let current: Node<T> | null = this.root;
    while (current !== null) {
      stream.push(current.getValue());
      current = current.left;
    }
    return stream;
  }
}
