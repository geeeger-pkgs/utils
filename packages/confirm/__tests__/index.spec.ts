import confirm from '../src';

describe('@geeeger/confirm module', () => {
  it('confirm:ok', async () => {
    setTimeout(() => {
      const event = document.createEvent('CustomEvent');
      event.initEvent('click', true, true);
      const dispatchEle = document.querySelector('.ok');
      if (dispatchEle) {
        dispatchEle.dispatchEvent(event);
      }
    }, 20);
    await expect(confirm('a')).resolves.toBeTruthy();
  });

  it('confirm:cancel', async () => {
    setTimeout(() => {
      const event = document.createEvent('CustomEvent');
      event.initEvent('click', true, true);
      const dispatchEle = document.querySelector('.cancel');
      if (dispatchEle) {
        dispatchEle.dispatchEvent(event);
      }
    }, 20);
    await expect(confirm('a')).resolves.toBeFalsy();
  });
});
