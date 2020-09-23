import Nesting from '../src';

describe('@geeeger/nesting module', () => {
  test('should pass', () => {
    const data = {
      a: 1,
    };

    const nest = new Nesting(data);
    expect(nest.get('a')).toEqual(1);
    expect(nest.get('a.b')).toEqual('');
  });
});
