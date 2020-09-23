/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import pv from '../src';

describe('@geeeger/page-visibility module', () => {
  test('should get value', () => {
    expect(pv.getState()).toBeTruthy();
    expect(typeof pv.isHidden() === 'boolean').toBeTruthy();
  });

  test('test event change', () => {
    expect.assertions(1);
    pv.addListener((isHidden: any) => {
      pv.removeListeners();
      expect(isHidden !== undefined).toBe(true);
    });
    const event = document.createEvent('CustomEvent');
    event.initEvent('visibilitychange', true, true);
    document.dispatchEvent(event);
  });

  test('test remove listener', () => {
    expect.assertions(1);
    const ls = function ls(isHidden: any) {
      expect(isHidden !== undefined).toBe(true);
    };
    const ls1 = function ls1(isHidden: any) {
      expect(isHidden !== undefined).toBe(true);
    };
    pv.addListener(ls);
    pv.addListener(ls1);
    pv.removeListener(ls);
    const event = document.createEvent('CustomEvent');
    event.initEvent('visibilitychange', true, true);
    document.dispatchEvent(event);
  });

  test('test once', async () => {
    setTimeout(() => {
      const event = document.createEvent('CustomEvent');
      event.initEvent('visibilitychange', true, true);
      document.dispatchEvent(event);
    }, 500);
    await expect(pv.once()).resolves.toBeTruthy();
  });
});
