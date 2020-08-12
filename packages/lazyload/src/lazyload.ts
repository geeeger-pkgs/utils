/* eslint-disable max-classes-per-file */
/**
 * see [api](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer)
 */
const intersectionObserverConfig = {
    // no need to set root
    root: null,
    // no need to set rootMargin
    rootMargin: '0px',
    // no need to set threshold
    threshold: [0],
};

/**
 * see [img src srcset]
 */
interface LazyLoadOptions {
    attributeSrc?: string;
    attributeSrcset?: string;
    selector?: string;
}

const defaultOptions = {
    attributeSrc: 'data-src',
    attributeSrcset: 'data-srcset',
    selector: '.qiefe-lazyload',
};

declare global {
    interface Window {
        IntersectionObserver: IntersectionObserver;
    }
}

const isAPISupported = Boolean(window.IntersectionObserver);

const TagImage = 'img';

function isImage(target: Element): boolean {
    return target.tagName.toLowerCase() === TagImage;
}

function load(
    target: any,
    {
        attributeSrc,
        attributeSrcset,
    }: typeof defaultOptions
): void {
    const imgElement = target;
    if (isImage(imgElement)) {
        const src = imgElement.getAttribute(attributeSrc);
        if (src) {
            imgElement.src = src;
        }
        const srcset = imgElement.getAttribute(attributeSrcset);
        if (srcset) {
            imgElement.srcset = srcset;
        }
        return;
    }
    imgElement.style.backgroundImage = `url(${imgElement.getAttribute(attributeSrc)})`;
}

class BaseLoad {
    opts: typeof defaultOptions;

    // 去除Set结构
    set: any[];

    constructor(options: LazyLoadOptions) {
        this.opts = { ...defaultOptions, ...options };
        this.set = [];
    }

    /* eslint-disable */
    start() {
    }
    /* eslint-enable */

    stop() {
        this.clearList();
    }

    addList(list: any[]) {
        this.set = this.set.concat(list);
    }

    has(ele: any) {
        for (let index = 0; index < this.set.length; index += 1) {
            const element = this.set[index];
            if (element === ele) {
                return true;
            }
        }
        return false;
    }

    clearList() {
        this.set = [];
    }

    destory() {
        this.clearList();
    }
}

class NormalLoad extends BaseLoad {
    start() {
        const { selector } = this.opts;
        const list = [...document.querySelectorAll(selector)];
        list.forEach((ele) => {
            if (ele && !this.has(ele)) {
                load(ele, this.opts);
            }
        });
        this.addList(list);
    }
}

class LazyLoad extends BaseLoad {
    observer: IntersectionObserver;

    constructor(options: LazyLoadOptions) {
        super(options);
        this.observer = this.createObserver();
    }

    createObserver() {
        return new IntersectionObserver((entrys, observer) => {
            entrys.forEach((entry: IntersectionObserverEntry) => {
                if (entry.intersectionRatio > 0) {
                    const { target } = entry;

                    // if in the view deal it and delete it
                    // 写前面因为我们不知道下次调起这个回调是什么时候
                    observer.unobserve(target);

                    load(target, this.opts);
                }
            });
        }, intersectionObserverConfig);
    }

    start() {
        const { selector } = this.opts;
        const list = [...document.querySelectorAll(selector)];
        list.forEach((ele) => {
            if (ele && !this.has(ele)) {
                this.observer.observe(ele);
            }
        });
        this.addList(list);
    }

    stop() {
        this.observer.disconnect();
        this.clearList();
        this.observer = this.createObserver();
    }

    destory() {
        this.observer.disconnect();
        this.clearList();
    }
}

export default {
    create(options: LazyLoadOptions = {}) {
        if (isAPISupported) {
            return new LazyLoad(options);
        }
        return new NormalLoad(options);
    },
};
