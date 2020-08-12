import Node from './node';

export default class LinkedList {
    root: Node | null;

    length: number;

    constructor(root: Node | null = null) {
        this.root = root;
        this.length = root ? 1 : 0;
    }

    [Symbol.iterator]() {
        let current = this.root;
        return {
            next() {
                if (current) {
                    const value = current.getValue();
                    current = current.left;
                    return {
                        value,
                        done: false,
                    };
                }
                return {
                    done: true,
                };
            },
        };
    }

    add(element: any) {
        if (this.root === null) {
            this.root = new Node(element, null);
        } else {
            this.root = new Node(element, this.root);
        }
        this.length += 1;
    }

    removeFirst() {
        if (this.root === null) {
            return null;
        }
        const element = this.root.getValue();
        this.root = this.root.left;
        this.length -= 1;
        return element;
    }

    search(element: any) {
        let current = this.root;
        while (current !== null) {
            if (current.getValue() === element) {
                return true;
            }
            current = current.left;
        }
        return false;
    }

    removeIf(callback: { (item: any): boolean; (arg0: any): void; (arg0: any): void }) {
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

    remove(element: any) {
        return this.removeIf((item: any) => item === element);
    }

    stream() {
        const stream: any[] = [];
        if (this.root === null) {
            return stream;
        }
        let current: Node | any = this.root;
        while (current !== null) {
            stream.push(current.getValue());
            current = current.left;
        }
        return stream;
    }

    edit(target: any, updateTo: any) {
        if (this.remove(target)) {
            this.add(updateTo);
            return true;
        }
        return false;
    }

    isEmpty() {
        return this.length === 0;
    }
}
