# `os`

> 判断环境类型函数

## Usage

```
import * as api from "@geeeger/os";

describe('@geeeger/os module', () => {
  it('should done', () => {
    expect(api.isAndroid()).toBeFalsy();
    expect(api.isIOS()).toBeFalsy();
    expect(api.isOriginalChrome()).toBeTruthy();
    expect(api.isQQ()).toBeFalsy();
    expect(api.isSafari()).toBeFalsy();
    expect(api.isQQNews()).toBeFalsy();
    expect(api.isQzone()).toBeFalsy();
    expect(api.isWX()).toBeFalsy();
    expect(api.isWXMP()).toBeFalsy();
    expect(api.isWeibo()).toBeFalsy();
  });
});
```
