# @qiefetv/lucky

企鹅春节抽奖跑马灯逻辑模块

## Usage


```js
const Lucky = require('@geeeger/lucky');
const lucky = new Lucky({
    // 抽奖奖品数量, 默认为8
    count: 8,
    // 抽奖转动默认时间间隔, 默认为20
    interval: 20,
    // 抽奖转动圈数, 默认为40
    cycle: 40,
    // 奖品所在index, 必填
    prize: 5
});
lucky.roll((finish: boolean, index: number) => {
    if (finish) {
        expect(index).to.eq(5);
        done();
    }
});
```

一个更为具体的例子

```js
const lucky = new Luckey({
    // 抽奖奖品数量, 默认为8
    count: 8,
    // 抽奖转动默认时间间隔, 默认为20
    interval: 20,
    // 抽奖转动圈数, 默认为40
    cycle: 40,
    // 奖品所在index, 必填
    prize: 5
});

// 停止上次抽奖并重新抽奖
lucky
    .reset({
        count: 20,
        prize: 5
    })
    .roll((finish: boolean, index: number) => {
        $('.roll-item')
            .eq(index)
            .addClass('cur')
            .siblings()
            .removeClass('cur')
        if (finish) {
            // 弹窗一类
        }
    });
```

## method

```sh
(method) lucky.roll(step: StepFunction): void
roll it
```

```sh
(method) lucky.reset(options?: LuckyProps): Lucky
重置各种计算参数
可用于下次抽奖前重置
```

```sh
(method) lucky.assign(options?: LuckyProps): Lucky
混入options
```
