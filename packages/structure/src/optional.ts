/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable new-cap */
/* eslint-disable max-classes-per-file */
class OptionalConstructor {
  value: any;

  constructor(value: any) {
    this.value = value;
  }

  map(fn: (value: any) => any) {
    let { value } = this;
    if (value === undefined) {
      value = '';
    }
    return Optional.ofNullable(fn.call(this, value));
  }

  orElse(value: any) {
    if (this.value === undefined) {
      return value;
    }
    return this.value;
  }
}

export default class Optional {
  static init = OptionalConstructor;

  static of(value: any) {
    if (value === undefined) {
      throw new TypeError('NullPointerException: of(value)');
    }
    return new Optional.init(value);
  }

  static ofNullable(value: any) {
    return new Optional.init(value);
  }
}
