# `@geeeger/structure`

> TODO: description

## Usage

```
import Stack from '@geeeger/structure/Stack';
import {
    Queue, HashMap, LinkedList, BinaryTree,
} from '@geeeger/structure';

describe('structure', () => {
    test('stack', () => {
        const stack = new Stack();
        stack.push(1);
        expect(stack.pop()).toBe(1);
    });

    test('queue', () => {
        const queue = new Queue();
        queue.push(1);
        expect(queue.peek()).toBe(1);
        expect(queue.size).toBe(1);
        expect(queue.pop()).toBe(1);
        expect(queue.isEmpty()).toBeTruthy();
    });

    test('hashmap', () => {
        const map = new HashMap();
        map.put('a', 'b');
        expect(map.get('a')).toBe('b');
        expect(map.contains('a')).toBeTruthy();
        expect(map.size).toBe(1);
        expect(map.tableSize).toBe(1);
        map.remove('a');
        expect(map.size).toBe(0);
    });

    test('linkedlist', () => {
        const list = new LinkedList();
        list.add(1);
        list.add(2);
        expect(list).toHaveLength(2);
        expect(list.search(2)).toBeTruthy();
        list.edit(2, 3);
        expect(list.search(2)).toBeFalsy();
        expect(list.search(3)).toBeTruthy();
        expect(list.removeFirst()).toBe(3);
        expect(list.stream()).toEqual([1]);
    });

    test('BinaryTree', () => {
        const bt = new BinaryTree();
        bt.add(1);
        bt.add(2);
        expect(bt.root.getValue()).toBe(1);
        expect(bt.root.left).toBeNull();
        expect(bt.root.right.getValue()).toBe(2);
        expect(bt.root.right).toEqual({
            element: 2,
            left: null,
            right: null,
        });
    });
});

```
