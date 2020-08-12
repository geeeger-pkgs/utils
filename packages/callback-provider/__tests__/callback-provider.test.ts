import CallbackProvider from '../src/callback-provider';

describe('test', () => {
    test('should pass', async () => {
        const c = new CallbackProvider();
        function d() {
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
