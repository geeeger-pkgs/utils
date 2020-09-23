import myModule from '../src';

describe('@geeeger/script-loader module', () => {
  test('jump', () => {
    myModule({
      beforeCreateScript(script) {
        expect(script).toBeDefined();
      },
      src: '',
    });
  });
});
