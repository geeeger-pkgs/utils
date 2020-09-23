import myModule from '../src';

describe('@geeeger/storage module', () => {
  it('should add', () => {
    expect(myModule.qSetItem('sessionStorage', '123', [1, 2, 3, 4])).toEqual({
      key: '123',
      value: '[1,2,3,4]',
    });
  });
});
