import CallbackProvider from '../src/callback-provider';

describe('test', () => {
    test('should pass', () => {
        const c = new CallbackProvider();
        function d() {
            return new Promise((res) => {
                c.pushCallbackStack('x', (data) => {
                    res(data);
                });
                c.listen('x');
            });
        }

        expect(d()).resolves.toEqual(1);
        c.run('x', 1);
    });
});
