# `get-gmtn-local-date`

> 输入 unix 时间戳，生成某时区时间

## Usage

```
import getGMTNLocalDate from '@geeeger/get-gmtn-local-date';

describe('@geeeger/get-gmt8-local-date module', () => {
  it('should be ', () => {
    expect(getGMTNLocalDate(Math.ceil(Date.now() / 1000), 8)).toBeInstanceOf(Date);
  });
});

```
