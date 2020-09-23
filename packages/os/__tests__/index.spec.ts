import * as api from '../src';

describe('@geeeger/os module', () => {
  it('should done', () => {
    expect(api.isAndroid()).toBeFalsy();
    expect(api.isIOS()).toBeFalsy();
    expect(api.isOriginalChrome()).toBeFalsy();
    expect(api.isQQ()).toBeFalsy();
    expect(api.isSafari()).toBeFalsy();
    expect(api.isQQNews()).toBeFalsy();
    expect(api.isQzone()).toBeFalsy();
    expect(api.isWX()).toBeFalsy();
    expect(api.isWXMP()).toBeFalsy();
    expect(api.isWeibo()).toBeFalsy();
  });
});
