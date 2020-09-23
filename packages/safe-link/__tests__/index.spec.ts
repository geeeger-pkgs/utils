import myModule from '../src';

describe('@geeeger/safe-link module', () => {
  it('should pass', () => {
    expect(typeof myModule()).toBe('string');
  });
});
