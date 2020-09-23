# `is-http-url`

> 判断链接是否为http链接

## Usage

```
import is from '@geeeger/is-http-url';
describe('@geeeger/is-http-url module', () => {
  it('should pass', () => {
    expect(is('http://www.baidu.com')).toBeTruthy();
    expect(is('https://www.baidu.com')).toBeTruthy();
    expect(is('//www.baidu.com')).toBeTruthy();
    expect(is('test://https://')).toBeFalsy();
  });
});
```
