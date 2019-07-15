import Node from './node';

export default class Queue {
    top: Node | null;
    size: any;
    bottom: Node | null;
    constructor() {
        this.top = null;
        this.bottom = null;
        this.size = 0;
    }

    push(element: any) {
        this.top = new Node(element, null, this.top);
        if (this.size === 0) {
            this.bottom = this.top;
        }
        else {
            // for type check
            if (this.top.right) {
                this.top.right.left = this.top;
            }
        }
        this.size++;
    }

    pop() {
        // for type check
        if (this.size === 0 || this.bottom === null) {
            return null;
        }
        let element = this.bottom.getValue();
        this.bottom = this.bottom.left;
        if (this.bottom !== null) {
            this.bottom.right = null;
        }
        this.size--;
        return element;
    }

    peek() {
        if (this.size === 0 || this.bottom === null) {
            return null;
        }
        return this.bottom.getValue();
    }

    isEmpty() {
        return this.size === 0;
    }
};
