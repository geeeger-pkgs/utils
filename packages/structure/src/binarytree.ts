/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import Node from './node';
import Optional from './optional';

export default class BinaryTree<T = any> {
  root: Node<T> | null;

  constructor(root: Node<T> | null = null) {
    this.root = root;
  }

  add(element: T): void {
    if (element === undefined) {
      return;
    }
    if (this.root === null) {
      this.root = new Node(element);
    } else {
      this._add(element, this.root);
    }
  }

  contains(element: T): boolean {
    if (element === undefined || this.root === null) {
      return false;
    }
    return this._contains(element, this.root);
  }

  printTree(level: any[]): void {
    if (level.length) {
      const newLevel = [];
      for (let i = 0, len = level.length; i < len; i += 1) {
        const node = level[i];
        if (node.left) {
          newLevel.push(node.left);
        }
        if (node.right) {
          newLevel.push(node.right);
        }
      }
      console.log('\n');
      this.printTree(newLevel);
    }
  }

  modify(oldElement?: T, newElement?: T): void {
    if (oldElement === undefined || oldElement === newElement) {
      return;
    }
    if (newElement === undefined) {
      this.remove(oldElement);
    } else if (this.contains(oldElement)) {
      this.remove(oldElement);
      this.add(newElement);
    }
  }

  toString(): string {
    return Optional.ofNullable(this.root)
      .map((root) => root.toString())
      .orElse(' ');
  }

  remove(element: T): void {
    this.root = this._remove(element, this.root);
  }

  private _add(element: T, root: Node<T>): void {
    if (root.getValue() === element) {
      // nothing to do
    } else if (root.getValue() > element) {
      if (root.left === null) {
        root.left = new Node(element);
      } else {
        this._add(element, root.left);
      }
    } else if (root.right === null) {
      root.right = new Node(element);
    } else {
      this._add(element, root.right);
    }
  }

  private _contains(element: T, root: Node<T> | null): boolean {
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

  private _remove(element: T, root: Node<T> | null): Node<T> | null {
    if (root === null) {
      return null;
    }
    if (root.getValue() > element) {
      root.left = this._remove(element, root.left);
    } else if (root.getValue() < element) {
      root.right = this._remove(element, root.right);
    } else if (root.left && root.right) {
      root.element = this._findMax(root.left);
      root.left = this._remove(root.getValue(), root.left);
    } else {
      return root.left === null ? root.right : root.left;
    }
    return root;
  }

  private _findMax(root: Node<T>): T {
    if (root.right !== null) {
      return this._findMax(root.right);
    }
    return root.getValue();
  }
}
