import { get, set, getAsync } from '../src/data';

describe('test', () => {
    test('should pass', async () => {
        set('x', 1);
        expect(get('x')).toEqual(1);
        await expect(getAsync('x')).resolves.toEqual(1);
        await expect(getAsync('y')).rejects.toThrow();
    });
});
