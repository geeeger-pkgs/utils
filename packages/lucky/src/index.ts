/* eslint-disable @typescript-eslint/no-explicit-any */
interface LuckyProps {
  count?: number;
  interval?: number;
  cycle?: number;
  prize?: number;
  [key: string]: any;
}

type StepFunction = (finish: boolean, index: number) => any;

export default class Lucky {
  /**
   * 转盘指针所落位置
   */
  index: number;

  /**
   * 计时器
   */
  timer: any;

  /**
   * 转动圈数
   */
  times: number;

  /**
   * 默认参数
   */
  defaultOptions: LuckyProps;

  /**
   * 传入参数
   */
  options: LuckyProps;

  /**
   * 当前速度
   */
  interval: number;

  /**
   * 构造函数
   * @param options {LuckyProps} 传入参数
   */
  constructor(options?: LuckyProps) {
    this.defaultOptions = {
      count: 8,
      cycle: 40,
      interval: 20,
      prize: -1,
    };
    this.times = 0;
    this.timer = 0;
    this.index = -1;
    this.options = this.defaultOptions;
    let customOpts: LuckyProps;
    if (!options) {
      customOpts = {};
    } else {
      customOpts = options;
    }
    this.interval = (customOpts.interval || this.options.interval) as number;
    this.assign(customOpts);
  }

  /**
   * 混入option
   * @param options
   */
  assign(options?: LuckyProps): this {
    if (!options) {
      return this;
    }
    Object.keys(options).forEach((key) => {
      this.options[key] = options[key];
    });
    return this;
  }

  /**
   * 重置各种计算参数
   */
  reset(options?: LuckyProps): this {
    clearTimeout(this.timer);
    if (options) {
      this.assign(options);
    }
    this.timer = 0;
    this.index = -1;
    this.times = 0;
    this.interval = this.options.interval as number;
    return this;
  }

  /**
   * roll it
   * @param step
   */
  roll(step: StepFunction): void {
    const { count = 0, cycle = 0, interval = 0 } = this.options;
    this.times += 1;
    this.index += 1;
    this.index = this.index % count;
    const cycleOffset = Math.floor(cycle / 4);

    /**
     * 处理结束状况
     */
    if (this.times > cycle + cycleOffset && this.options.prize === this.index) {
      const { index } = this;
      this.reset();
      step(true, index);
      return;
    }

    step(false, this.index);

    const halfInterval = Math.floor(interval / 2);

    // 加速roll
    if (this.times < cycle) {
      this.interval -= halfInterval;
    } else {
      const halfIndex = Math.floor(count / 2) + 1;
      // 如果在转动到目标转动次数 + 默认offset值
      // 并且如果prize 为首个， index走过礼物数量里一半
      // 或者为prize的下一个index,强力减速
      if (
        this.times > cycle + cycleOffset &&
        ((this.options.prize === 0 && this.index === halfIndex) ||
          this.options.prize === this.index + 1)
      ) {
        const longInterval = halfInterval * 11;
        this.interval += longInterval;
      } else {
        // 要不然慢减速
        this.interval += interval;
      }
    }
    // 如果加速过快，使用默认速度
    if (this.interval < interval) {
      this.interval = interval;
    }

    this.timer = setTimeout(() => {
      this.roll(step);
    }, this.interval);
  }
}
