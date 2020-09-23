import LinkedList from './linkedlist';

export default class Stack {
  stack: LinkedList;

  currentAmount: number;

  constructor() {
    this.stack = new LinkedList();
    this.currentAmount = 0;
  }

  push(element: any) {
    this.stack.add(element);
    this.currentAmount += 1;
  }

  pop() {
    if (this.currentAmount) {
      this.currentAmount -= 1;
      return this.stack.removeFirst();
    }
    return null;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    const element = this.pop();
    this.push(element);
    return element;
  }

  size() {
    return this.currentAmount;
  }

  isEmpty() {
    return this.currentAmount === 0;
  }
}
