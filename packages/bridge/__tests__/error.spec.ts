import BridgeError from '../src/error';

describe('BridgeError', () => {
  it('should extends with Error', () => {
    const newError = new BridgeError('123');
    expect(newError instanceof Error).toBe(true);
    expect(newError.name).toBe('BridgeError');
    expect(typeof newError.message === 'string').toBe(true);
    expect(typeof newError.stack === 'string').toBe(true);
  });
});
