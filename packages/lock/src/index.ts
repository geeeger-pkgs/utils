/* eslint-disable @typescript-eslint/no-explicit-any */
export default class Lock {
  time: number;

  isLocked: boolean;

  timer: any;

  constructor(time: number) {
    this.time = time;
    this.isLocked = false;
  }

  lockIt(): void {
    if (this.isLocked) {
      return;
    }
    this.isLocked = true;
    this.timer = setTimeout(() => {
      this.isLocked = false;
    }, this.time);
  }

  reset(time?: number): this {
    clearTimeout(this.timer);
    this.isLocked = false;
    if (time) {
      this.time = time;
    }
    return this;
  }
}
