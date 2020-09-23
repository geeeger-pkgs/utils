# `data`

> 缓存工具

## Usage

```
import { get, set, getAsync } from '@geeeger/data';

describe('test', () => {
    test('should pass', () => {
        set('x', 1);
        expect(get('x')).toEqual(1);
        expect(getAsync('x')).resolves.toEqual(1);
        expect(getAsync('y')).rejects.toThrow();
    });
});
```
