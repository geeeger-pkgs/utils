/* eslint-disable @typescript-eslint/no-explicit-any */
import Node from './node';

export default class Queue<T = any> {
  top: Node<T> | null;

  size: number;

  bottom: Node<T> | null;

  constructor() {
    this.top = null;
    this.bottom = null;
    this.size = 0;
  }

  push(element: T): void {
    this.top = new Node(element, null, this.top);
    if (this.size === 0) {
      this.bottom = this.top;
    } else if (this.top.right) {
      // for type check
      this.top.right.left = this.top;
    }
    this.size += 1;
  }

  pop(): T | null {
    // for type check
    if (this.size === 0 || this.bottom === null) {
      return null;
    }
    const element = this.bottom.getValue();
    this.bottom = this.bottom.left;
    if (this.bottom !== null) {
      this.bottom.right = null;
    }
    this.size -= 1;
    return element;
  }

  peek(): T | null {
    if (this.size === 0 || this.bottom === null) {
      return null;
    }
    return this.bottom.getValue();
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
}
