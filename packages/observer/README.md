# `observer`

> 简单的发布订阅模块

## Usage

```
const Observer = require('@geeeger/observer');

// or new Observer(context);
const observer = Observer.create();
observer.on('a', () => 1, {});
observer.fire('a') === 1;

observer.trigger('a');
observer.off();

observer.observers.a === undefined;

const scope = {};

const scope1 = {};

const listener = function (a) { console.log(a, this) }

observer.on(['a', 'b'], listener, scope);
observer.on('b', () => {}, scope1);

observer.emit(['a', 'b', ''], 1, 2, 3);

observer.off(['a']);
observer.observers.a === undefined;

observer.off('b', undefined, scope1);
observer.observers.b.length === 1;


observer.off('b', listener);
observer.observers.b.length === 0;
```
