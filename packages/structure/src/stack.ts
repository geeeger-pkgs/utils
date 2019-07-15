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
        this.currentAmount++;
    }

    pop() {
        if (this.currentAmount) {
            this.currentAmount--;
            return this.stack.removeFirst();
        }
        return null;
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        let element = this.pop();
        this.push(element);
        return element;
    }

    size() {
        return this.currentAmount;
    }

    isEmpty() {
        return this.currentAmount === 0;
    }
};
