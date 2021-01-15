import getState from './get-state';
import isHidden from './is-hidden';

const doc: Document = document;

type OnChangeListener = (isHidden: boolean) => void;

let listeners: OnChangeListener[] = [];

function addListener(fn: OnChangeListener): void {
  listeners.push(fn);
}

function removeListener(fn: OnChangeListener): void {
  for (let i = 0; i < listeners.length; ) {
    const listener = listeners[i];
    if (listener === fn) {
      listeners.splice(i, 1);
    } else {
      i += 1;
    }
  }
}

function removeListeners(): void {
  listeners = [];
}

const visibilityChange = 'visibilitychange';

function once(): PromiseLike<{ ishidden: boolean; timeout: number }> {
  const nowTime = new Date().getTime();
  return new Promise((resolve) => {
    const resolver = (): void => {
      doc.removeEventListener(visibilityChange, resolver);
      const changeTime = new Date().getTime();
      resolve({
        ishidden: isHidden(),
        timeout: changeTime - nowTime,
      });
    };
    doc.addEventListener(visibilityChange, resolver, false);
  });
}

function listener(): void {
  const ishidden = isHidden();
  listeners.forEach((listener) => listener(ishidden));
}

function init(): void {
  doc.addEventListener(visibilityChange, listener, false);
}

function destory(): void {
  doc.removeEventListener(visibilityChange, listener);
  removeListeners();
}

export default {
  addListener,
  destory,
  getState,
  init,
  isHidden,
  once,
  removeListener,
  removeListeners,
};
