/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isFunction, isArray, isString } from '@geeeger/is';

type performer = (name: string) => void;

const undef = undefined;

function wrap(names: string[] | string, performer: performer): void {
  if (isArray(names)) {
    let name = (names as string[]).shift();
    while (name) {
      performer(name);
      name = (names as string[]).shift();
    }
    return;
  }
  performer(names as string);
}

type listener = (...args: any[]) => any;

interface ObserverType {
  listener: listener;
  context: any;
}

interface ObserverGroup {
  [key: string]: ObserverType[];
}

const pkgName = '@geeeger/observer';

function attach(
  observerGroup: ObserverGroup,
  name: string,
  listener: listener,
  context?: any
): void {
  if (!isString(name)) {
    throw new Error(`${pkgName}: name should be string!`);
  }

  const observerGroupObject = observerGroup;

  if (!observerGroupObject[name]) {
    observerGroupObject[name] = [];
  }

  const listeners = observerGroupObject[name];

  listeners.push({
    context,
    listener,
  });
}

function detach(
  observerGroup: ObserverGroup,
  name: string,
  listener?: listener,
  context?: any
): void {
  if (!isString(name) || !observerGroup[name]) {
    return;
  }

  const listeners = observerGroup[name];

  if (listener) {
    for (let i = 0; i < listeners.length; ) {
      const element = listeners[i];
      if (element.listener === listener) {
        listeners.splice(i, 1);
      } else {
        i += 1;
      }
    }
  }

  if (context) {
    for (let i = 0; i < listeners.length; ) {
      const element = listeners[i];
      if (element.context === context) {
        listeners.splice(i, 1);
      } else {
        i += 1;
      }
    }
  }

  if (!listener && !context) {
    const observerGroupObject = observerGroup;
    delete observerGroupObject[name];
  }
}

function notify(observerInstance: MakeObserver, name: string, args: any[]): void {
  if (!isString(name) || !observerInstance.observers[name]) {
    return;
  }

  const listeners = observerInstance.observers[name];

  for (let i = 0; i < listeners.length; i += 1) {
    const element = listeners[i];
    element.listener.apply(element.context || observerInstance.context || observerInstance, args);
  }
}

function notifyOne(observerInstance: MakeObserver, name: string, args: any[]): any {
  if (!isString(name) || !observerInstance.observers[name]) {
    return undef;
  }

  const listener: ObserverType = observerInstance.observers[name][0];

  if (!listener) {
    return undef;
  }

  return listener.listener.apply(
    listener.context || observerInstance.context || observerInstance,
    args
  );
}

class MakeObserver {
  context: any;

  observers: ObserverGroup;

  [key: string]: any;

  constructor(context?: any) {
    this.context = context;
    this.observers = {};
  }

  attach(names: string[] | string, listener: listener, context?: any): this {
    if (!isFunction(listener)) {
      throw new Error(`${pkgName}: listener should be function`);
    }

    wrap(names, (name: string) => {
      attach(this.observers, name, listener, context);
    });

    return this;
  }

  detach(names?: string[] | string, listener?: listener, context?: any): this {
    if (!names) {
      this.observers = {};
      return this;
    }

    wrap(names, (name: string) => {
      detach(this.observers, name, listener, context);
    });

    return this;
  }

  notify(names: string[] | string, ...args: any[]): this {
    wrap(names, (name: string) => {
      notify(this, name, args);
    });
    return this;
  }

  notifyOne(name: string, ...args: any[]): any {
    if (!name) {
      throw new Error(`${pkgName}: event name shouldn't be empty.`);
    }
    return notifyOne(this, name, args);
  }

  on = this.attach;

  off = this.detach;

  trigger = this.notify;

  fire = this.notifyOne;

  emit = this.notify;

  static create(context?: any): MakeObserver {
    return new MakeObserver(context);
  }
}

export default MakeObserver;
