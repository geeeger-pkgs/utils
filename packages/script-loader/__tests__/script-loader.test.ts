import loader from '../src/loader';

describe('test', () => {
    test('jump', () => {
        loader({
            src: '',
            beforeCreateScript(script) {
                expect(script).toBeDefined();
            },
        });
    });
});
