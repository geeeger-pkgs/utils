import {
    isArray,
    isBoolean,
    isDate,
    isError,
    isFunction,
    isNull,
    isNumber,
    isObject,
    isRegExp,
    isString,
    isSymbol,
    isUndefined,
    isJson,
} from '../src/is';

it('isArray', () => {
    expect(isArray([])).toBeTruthy();
});

it('isBoolean', () => {
    expect(isBoolean(true)).toBeTruthy();
});

it('isDate', () => {
    expect(isDate(new Date())).toBeTruthy();
});

it('isError', () => {
    expect(isError(new Error())).toBeTruthy();
});

it('isFunction', () => {
    expect(isFunction(() => {})).toBeTruthy();
});

it('isNull', () => {
    expect(isNull(null)).toBeTruthy();
});

it('isNumber', () => {
    expect(isNumber(0)).toBeTruthy();
});

it('isObject', () => {
    expect(isObject({})).toBeTruthy();
});

it('isRegExp', () => {
    expect(isRegExp(/a/)).toBeTruthy();
});

it('isString', () => {
    expect(isString('')).toBeTruthy();
});

it('isSymbol', () => {
    expect(isSymbol(Symbol(1))).toBeTruthy();
});

it('isUndefined', () => {
    expect(isUndefined(undefined)).toBeTruthy();
});
it('isJson', () => {
    expect(isJson(JSON.stringify([]))).toBeTruthy();
});
