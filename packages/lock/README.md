# `lock`

> 逻辑锁工具

## Usage

```
const Lock = require('@geeeger/lock');

const lock = new Lock(3000);

lock.lockIt();

lock.isLocked === true;

lock.reset(2000?);
```
