import { URL, URLSearchParams } from '../src';

describe('@geeeger/url module', () => {
  it('should pass', () => {
    expect(new URL('https://www.baidu.com').hostname).toBe('www.baidu.com');
    expect(new URLSearchParams('a=1&b=2').get('a')).toBe('1');
  });
});
