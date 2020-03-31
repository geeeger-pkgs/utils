import confirm from '../src/confirm';

it('confirm:ok', () => {
    expect(confirm('a')).resolves.toBeTruthy();
    const event = document.createEvent('CustomEvent');
    event.initEvent('click', true, true);
    const dispatchEle = document.querySelector('.ok');
    if (dispatchEle) {
        dispatchEle.dispatchEvent(event);
    }
});

it('confirm:cancel', () => {
    expect(confirm('a')).resolves.toBeFalsy();
    const event = document.createEvent('CustomEvent');
    event.initEvent('click', true, true);
    const dispatchEle = document.querySelector('.cancel');
    if (dispatchEle) {
        dispatchEle.dispatchEvent(event);
    }
});
