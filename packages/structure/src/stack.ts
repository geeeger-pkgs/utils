/* eslint-disable @typescript-eslint/no-explicit-any */
import LinkedList from './linkedlist';

export default class Stack<T = any> {
  stack: LinkedList<T>;

  currentAmount: number;

  constructor() {
    this.stack = new LinkedList();
    this.currentAmount = 0;
  }

  push(element: T): void {
    this.stack.add(element);
    this.currentAmount += 1;
  }

  pop(): T | null {
    if (this.currentAmount) {
      this.currentAmount -= 1;
      return this.stack.removeFirst();
    }
    return null;
  }

  peek(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    const element = this.pop();
    this.push(element as T);
    return element;
  }

  size(): number {
    return this.currentAmount;
  }

  isEmpty(): boolean {
    return this.currentAmount === 0;
  }
}
