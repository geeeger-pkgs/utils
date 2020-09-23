/* eslint-disable @typescript-eslint/no-explicit-any */
import CallbackProvider from '../src';

describe('@geeeger/callback-provider module', () => {
  it('should add', async () => {
    const c = new CallbackProvider();
    function d(): Promise<any> {
      return new Promise((res) => {
        c.pushCallbackStack('x', (data) => {
          res(data);
        });
        c.listen('x');
      });
    }
    setTimeout(() => {
      c.run('x', 1);
    }, 20);
    await expect(d()).resolves.toEqual(1);
  });
});
