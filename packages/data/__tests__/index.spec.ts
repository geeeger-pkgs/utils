import { get, set, getAsync } from '../src';

describe('@geeeger/data module', () => {
  test('should pass', async () => {
    set('x', 1);
    expect(get('x')).toEqual(1);
    await expect(getAsync('x')).resolves.toEqual(1);
    await expect(getAsync('y')).rejects.toThrow();
  });
});
