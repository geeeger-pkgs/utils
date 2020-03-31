# `script-loader`

> 加载第三方脚本

## Usage

```
import loader from '@geeeger/script-loader';

loader({
    src: 'some/script/path.js',
    // optional
    callback: function () {
        dataBus.set('wx', window.wx);
    },
    // optional
    error: function () {
        alert('load-script error');
    },
    // optional
    async: true,
    // optional
    cache: true
})
```
