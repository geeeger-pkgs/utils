import { lock, unlock } from '../src';

describe('@geeeger/body-lock module', () => {
  it('should add', () => {
    lock();
    lock();
    expect(document.body.style.height).toBe('100vh');
    unlock();
    expect(document.body.style.height).toBe('100vh');
    unlock();
    expect(document.body.style.height).toBe('auto');
  });
});
