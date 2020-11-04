import getGMTNLocalDate from '../src';

describe('@geeeger/get-gmtn-local-date module', () => {
  it('should be ', () => {
    expect(getGMTNLocalDate(Math.ceil(Date.now() / 1000), 8)).toBeInstanceOf(Date);
  });
});
