import qieStorage from '../src/storage';

test('storage', () => {
    expect(qieStorage.qSetItem('sessionStorage', '123', [1, 2, 3, 4])).toEqual({
        key: '123',
        value: '[1,2,3,4]',
    });
});
