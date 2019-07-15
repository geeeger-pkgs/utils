# `nesting`

> 防止嵌套数据结构有误的小工具

## Usage

```
import Nesting from '@geeeger/nesting';

describe('test', () => {
    test('should pass', () => {
        const data = {
            a: 1,
        };

        const nest = new Nesting(data);
        expect(nest.get('a')).toEqual(1);
        expect(nest.get('a.b')).toEqual('');
    });
});
```
