import rate from '../src';

describe('rate module', () => {
  it('should exist', () => {
    expect(rate(0)).toEqual(0);
    expect(rate(1.75)).toEqual(0.5);
    expect(rate(2)).toEqual(1);
    expect(rate(2.1)).toEqual(1.5);
    expect(rate(10)).toEqual(5);
  });
});
