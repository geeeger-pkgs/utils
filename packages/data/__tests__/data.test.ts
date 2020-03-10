import { get, set, getAsync } from '../src/data';

describe('test', () => {
    test('should pass', () => {
        set('x', 1);
        expect(get('x')).toEqual(1);
        expect(getAsync('x')).resolves.toEqual(1);
        expect(getAsync('y')).rejects.toThrow();
    });
});
