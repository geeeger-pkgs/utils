import Observer from '../src';

describe('@geeeger/observer module', () => {
  it('listen', () => {
    const observer = Observer.create();
    observer.on('a', () => 1, {});
    expect(observer.fire('a')).toBe(1);
    observer.trigger('a');
    observer.off();
    expect(observer.observers.a).toBeFalsy();
    expect(() => {
      observer.fire('');
    }).toThrow();
    let test = 0;
    const scope = {};
    const scope1 = {};
    const listener = (): void => {
      test += 1;
    };
    observer.on(['a', 'b'], listener, scope);
    observer.on(
      'b',
      () => {
        // nothing
      },
      scope1
    );
    observer.emit(['a', 'b', '']);
    expect(test).toBe(2);
    observer.off(['a']);
    expect(observer.observers.a).toBeFalsy();
    observer.off('b', undefined, scope1);
    expect(observer.observers.b).toHaveLength(1);
    observer.off('b', listener);
    expect(observer.observers.b).toHaveLength(0);
  });
});
