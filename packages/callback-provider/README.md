# `data`

> callback管理工具

## Usage

```

import CallbackProvider from '@geeeger/callback-provider';

describe('test', () => {
    test('should pass', () => {
        const c = new CallbackProvider(window);
        function d() {
            return new Promise((res) => {
                c.pushCallbackStack('x', (data) => {
                    res(data);
                });
                c.listen('x');
            });
        }

        expect(d()).resolves.toEqual(1);
        c.run('x', 1);
    });
});
```
