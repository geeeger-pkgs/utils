import randomId from '../src';

describe('@geeeger/random-id module', () => {
  it('random-id', () => {
    const reg = /^id\d+$/;
    reg.lastIndex = -1;
    expect(reg.test(randomId())).toBeTruthy();
  });
});
