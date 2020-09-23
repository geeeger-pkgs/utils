# `storage`

> 本地存储工具

## Usage

```
import qieStorage from '@geeeger/storage';
// 可使用sessionStorage
// 或者localStorage
test('storage', () => {
    expect(qieStorage.qSetItem('sessionStorage', '123', [1, 2, 3, 4])).toEqual({
        key: '123',
        value: '[1,2,3,4]',
    });
});
```
