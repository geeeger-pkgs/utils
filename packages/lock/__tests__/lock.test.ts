import Lock from '../src/lock';

describe('test', () => {
    test('should pass', () => {
        const lock = new Lock(2000);
        lock.lockIt();
        lock.reset()
            .reset(2000)
            .lockIt();
        expect(lock.isLocked).toBeTruthy();
        setTimeout(() => {
            expect(lock.isLocked).toBeFalsy();
        }, 2000);
    });
});
