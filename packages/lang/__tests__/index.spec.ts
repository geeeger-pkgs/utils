/* eslint-disable @typescript-eslint/no-explicit-any */
import * as API from '../src';

describe('@geeeger/lang module', () => {
  it('API.safec', () => {
    const fn = (): string => 'safec-test';
    const tt = {};
    expect(API.safec(fn)).toBeUndefined();
    expect(API.safec(tt)).toBeUndefined();
  });
  it('API.each', () => {
    const obj = { a: 1 };
    const arr = [{ b: 2 }, { c: 3 }];
    const next = (value: any, key: any): string => `value:${value},key:${key}`;
    expect(API.each(obj, next)).toBeUndefined();
    expect(API.each(arr, next)).toBeUndefined();
  });
  it('API.mixi', () => {
    const obj = { a: 1 };
    const arr = { b: 2 };
    const brr = { c: 3 };
    expect(API.mixi(arr, obj, brr)).toEqual({ a: 1, b: 2, c: 3 });
  });
  it('API.interval', () => {
    const fn = (): string => 'interval-test';
    const step = 500;
    const right = true;
    expect(API.interval(fn, step, right)).toBeUndefined();
  });
  it('API.string', () => {
    const s = 'a2卡3a4tt';
    const t = 'XX';
    const tt = '{0}abc';
    expect(API.string.bytelen(s)).toBe(10);
    expect(API.string.format(tt, t)).toBe('XXabc');
    expect(API.string.join(t, s)).toBe('XXa2卡3a4tt');
  });
  it('API.floatMath', () => {
    const arg1 = 10.11;
    const arg2 = 20.22;
    const num = 2;
    expect(API.floatMath.Subtr(arg1, arg2, num)).toBe('-10.11');
    expect(API.floatMath.accAdd(arg1, arg2, num)).toBe('30.33');
    expect(API.floatMath.accDiv(arg1, arg2)).toBe(0.5);
    expect(API.floatMath.accMul(arg1, arg2)).toBe(204.4242);
  });
  it('API.calNumber', () => {
    const a = 11112;
    const b = 2;
    expect(API.calNumber(a, b)).toBe('1.11万');
  });
  it('API.getByteLen', () => {
    const val = 'kaksdf卡加水淀粉';
    expect(API.getByteLen(val)).toBe(21);
  });
  it('API.getStrLen', () => {
    const val = 'kaksdf卡加水淀粉';
    expect(API.getStrLen(val)).toBe(11);
  });
  it('API.getBrowserV', () => {
    const num = 10;
    expect(API.getBrowserV(num)).toBeTruthy();
  });
  it('API.isInstallFlash', () => {
    expect(API.isInstallFlash()).toBeDefined();
  });
  it('API.getJSONDate', () => {
    const json = API.getJSONDate(new Date().getTime());
    expect(json.y).toBe(new Date().getFullYear());
    const json1 = API.getJSONDate(new Date().getTime() / 1000, true);
    expect(json1.y).toBe(new Date().getFullYear());
  });
  it('API.padTime', () => {
    expect(API.padTime(1)).toBe('01');
  });
  it('API.getTimeTips', () => {
    expect(API.getTimeTips(10000000, 1)).toBe('很久以前');
    expect(API.getTimeTips(86400, 0)).toBe('1天前');
    expect(API.getTimeTips(3600, 0)).toBe('1小时前');
    expect(API.getTimeTips(60, 0)).toBe('1分钟前');
    expect(API.getTimeTips(60, 1)).toBe('刚刚');
  });
  it('API.encodeHtml', () => {
    expect(API.encodeHtml('<a>')).toBe('&lt;a&gt;');
  });
});
