/* eslint-disable @typescript-eslint/no-explicit-any */
function getEventListenerOptions(options: any): boolean {
  let isSupportOptions = false;
  const listenerOptions = {
    get passive(): void {
      isSupportOptions = true;
      return;
    },
  };
  const noop = function noop(): void {
    // none
  };

  const testEvent = '__TUA_BSL_TEST_PASSIVE__';
  const win: any = window;
  win.addEventListener(testEvent, noop, listenerOptions);
  win.removeEventListener(testEvent, noop, listenerOptions);
  const capture = options.capture;
  return isSupportOptions ? options : typeof capture !== 'undefined' ? capture : false;
}

let documentListenerAdded = false;
const eventListenerOptions = getEventListenerOptions({
  passive: false,
});
let lockNum = 0;

function preventDefault(e: any): void {
  e.preventDefault();
}

export function lock(): void {
  lockNum++;
  document.body.style.height = '100vh';
  document.body.style.overflow = 'hidden';
  if (!documentListenerAdded) {
    document.addEventListener('touchmove', preventDefault, eventListenerOptions);
    documentListenerAdded = true;
  }
}

export function unlock(): void {
  lockNum--;
  if (lockNum > 0) {
    return;
  }
  if (documentListenerAdded) {
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
    document.removeEventListener('touchmove', preventDefault, eventListenerOptions);
    documentListenerAdded = false;
  }
}
