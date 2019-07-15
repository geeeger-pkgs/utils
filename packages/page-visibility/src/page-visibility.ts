import getState from './get-state';
import isHidden from './is-hidden';

const doc: Document = document;

let MyPromise: PromiseConstructorLike = Promise;

function setPromise(SomePromiseConstructorLike: PromiseConstructorLike): void {
    MyPromise = SomePromiseConstructorLike;
}

type OnChangeListener = (isHidden: boolean) => void;

let listeners: OnChangeListener[] = [];

function addListener(fn: OnChangeListener) {
    listeners.push(fn);
}

function removeListener(fn: OnChangeListener) {
    for (let i = 0; i < listeners.length;) {
        const listener = listeners[i];
        if (listener === fn) {
            listeners.splice(i, 1);
        } else {
            i += 1;
        }
    }
}

function removeListeners() {
    listeners = [];
}

const visibilityChange = 'visibilitychange';

function once(): PromiseLike<{ishidden: boolean; timeout: number}> {
    const nowTime = new Date().getTime();
    return new MyPromise((resolve) => {
        const resolver = () => {
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

document.addEventListener(visibilityChange, () => {
    const ishidden = isHidden();
    listeners.forEach(listener => listener(ishidden));
}, false);

export default {
    getState,
    isHidden,
    setPromise,
    addListener,
    removeListener,
    removeListeners,
    once,
};
