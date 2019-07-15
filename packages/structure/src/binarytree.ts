import Node from './node';
import Optional from './optional';

export default class BinaryTree {
    root: any;
    constructor(root: any = null) {
        this.root = root;
    }

    add(element: any) {
        if (element === undefined) {
            return;
        }
        if (this.root === null) {
            this.root = new Node(element);
        }
        else {
            this._add(element, this.root);
        }
    }
    private _add(element: any, root: any) {
        if (root.getValue() === element) {
            return;
        }
        else if (root.getValue() > element) {
            if (root.left === null) {
                root.left = new Node(element);
            }
            else {
                this._add(element, root.left);
            }
        }
        else {
            if (root.right === null) {
                root.right = new Node(element);
            }
            else {
                this._add(element, root.right);
            }
        }
    }

    contains(element: any) {
        if (element === undefined || this.root === null) {
            return false;
        }
        return this._contains(element, this.root);
    }
    private _contains(element: any, root: any): boolean {
        if (root === null) {
            return false;
        }
        if (root.getValue() === element) {
            return true;
        }
        if (root.getValue() > element) {
            return this._contains(element, root.left);
        }
        return this._contains(element, root.right);
    }

    remove(element: any) {
        this.root = this._remove(element, this.root);
    }
    _remove(element: any, root: any): Node | any {
        if (root === null) {
            return null;
        }
        else if (root.getValue() > element) {
            root.left = this._remove(element, root.left);
        }
        else if (root.getValue() < element) {
            root.right = this._remove(element, root.right);
        }
        else if (root.left && root.right) {
            root.element = this._findMax(root.left);
            root.left = this._remove(root.getValue(), root.left);
        }
        else {
            return root.left === null ? root.right : root.left;
        }
        return root;
    }
    _findMax(root: any): any {
        if (root.right !== null) {
            return this._findMax(root.right);
        }
        return root.getValue();
    }

    modify(oldElement: any, newElement: any) {
        if (oldElement === undefined || oldElement === newElement) {
            return;
        }
        if (newElement === undefined) {
            this.remove(oldElement);
        }
        else if (this.contains(oldElement)) {
            this.remove(oldElement);
            this.add(newElement);
        }
    }

    toString() {
        return Optional.ofNullable(this.root).map(function (root) {
            return root.toString();
        }).orElse(" ");
    }

    printTree(level: any[]) {
        if (level.length) {
            var newLevel = [];
            for (var i = 0, len = level.length; i < len; i++) {
                var node = level[i];
                console.log(node.element);
                node.left && newLevel.push(node.left);
                node.right && newLevel.push(node.right);
            }
            console.log('\n');
            this.printTree(newLevel);
        }
    }
};
