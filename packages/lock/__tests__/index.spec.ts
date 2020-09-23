import Lock from '../src';

describe('@geeeger/lock module', () => {
  test('should pass', () => {
    const lock = new Lock(2000);
    lock.lockIt();
    lock.reset().reset(2000).lockIt();
    expect(lock.isLocked).toBeTruthy();
    setTimeout(() => {
      expect(lock.isLocked).toBeFalsy();
    }, 2000);
  });
});
