/* eslint-disable @typescript-eslint/no-explicit-any */
import Optional from './optional';

export default class Node<T = any> {
  element: T;

  left: Node<T> | null;

  right: Node<T> | null;

  constructor(element: T, left: Node<T> | null = null, right: Node<T> | null = null) {
    this.element = element;
    this.left = left;
    this.right = right;
  }

  getValue(): T {
    return this.element;
  }

  toString(): string {
    const element: any = this.getValue();

    let value = '';

    if (element === undefined) {
      value = 'undefined';
    }

    if (element === null) {
      value = 'null';
    }

    if (element.toString) {
      value = element.toString();
    }

    return `${Optional.ofNullable(this.left)
      .map((node) => node.toString())
      .orElse(' ')} ${value} ${Optional.ofNullable(this.right)
      .map((node) => node.toString())
      .orElse(' ')}`;
  }

  equals(element: any): boolean {
    return this.element === element;
  }
}
