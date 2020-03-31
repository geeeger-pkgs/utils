import randomId from '../src/random-id';

it('random-id', () => {
    const reg = /^id\d+$/;
    reg.lastIndex = -1;
    expect(reg.test(randomId())).toBeTruthy();
});
