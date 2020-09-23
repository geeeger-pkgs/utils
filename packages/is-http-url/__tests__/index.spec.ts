import is from '../src';

describe('@geeeger/is-http-url module', () => {
  it('should pass', () => {
    expect(is('http://www.baidu.com')).toBeTruthy();
    expect(is('https://www.baidu.com')).toBeTruthy();
    expect(is('//www.baidu.com')).toBeTruthy();
    expect(is('test://https://')).toBeFalsy();
  });
});
