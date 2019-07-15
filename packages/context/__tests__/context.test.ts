import * as API from '../src/context';

it('api.setAll', () => {
    const keys = 'aa';
    const obja: object = { dd: 11 };
    const objb: object = { cc: obja };
    const objc: object = { bb: objb };
    expect(API.setAll(keys, objc)).toBeUndefined();
});

it('api.set', () => {
    const key = 'aa.bb.cc.dd';
    const val = '33';
    expect(API.set(key, val)).toBeUndefined();
});

it('api.get', () => {
    const key = 'aa.bb.cc.dd';
    expect(API.get(key)).toBe('33');
});
