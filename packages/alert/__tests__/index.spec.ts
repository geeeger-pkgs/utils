import alert from '../src';

describe('@geeeger/alert module', () => {
  it('alert', async () => {
    setTimeout(() => {
      const event = document.createEvent('CustomEvent');
      event.initEvent('click', true, true);
      const dispatchEle = document.querySelector('.foot');
      if (dispatchEle) {
        dispatchEle.dispatchEvent(event);
      }
    }, 20);
    await expect(alert('a')).resolves.toBe(undefined);
  });
});
