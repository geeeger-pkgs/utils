import Optional from './optional';

export default class Node {
    element: any;

    left: Node | null;

    right: Node | null;

    constructor(element: any, left: Node | null = null, right: Node | null = null) {
        this.element = element;
        this.left = left;
        this.right = right;
    }

    getValue() {
        return this.element;
    }

    toString() {
        return `${Optional
            .ofNullable(this.left)
            .map((node) => node.toString())
            .orElse(' ')} ${
            this.getValue().toString()} ${
            Optional
                .ofNullable(this.right)
                .map((node) => node.toString())
                .orElse(' ')}`;
    }

    equals(element: any) {
        return this.element === element;
    }
}
