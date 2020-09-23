import cookie from '../src';

describe('@geeeger/cookie module', () => {
  it('should pass', () => {
    expect(cookie.setCookie('test', '123')).toEqual({
      setCookieKey: 'test',
      setCookieValue: '123',
    });
    expect(cookie.getCookie('test')).toBe('123');
    expect(cookie.delCookie('test')).toEqual({
      delCookieKey: 'test',
      delCookieValue: '123',
    });
    expect(cookie.getCookie('test')).toBe('');
  });
});
