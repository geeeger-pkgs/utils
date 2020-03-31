import alert from '../src/alert';

it('alert', () => {
    expect(alert('a')).resolves.toBe(undefined);
    const event = document.createEvent('CustomEvent');
    event.initEvent('click', true, true);
    const dispatchEle = document.querySelector('.foot');
    if (dispatchEle) {
        dispatchEle.dispatchEvent(event);
    }
});
