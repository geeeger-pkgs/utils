# bridge

为与app交互制作的封装

## Usage

### 自行注册Bridge

```js
import { Bridge, BridgeType, DealType } from 'bridge';

import { Bridge, BridgeType, DealType } from './Bridge';
const bridge = new Bridge();
bridge.regist(BridgeType.sync, 'checkLogin', DealType.json);
bridge.regist(BridgeType.async, 'login', 'checkAppLogin', DealType.json);
bridge.regist(BridgeType.notice, 'closePage');
bridge.regist(BridgeType.notice, 'getRoomId');
bridge.alias('getRoomId', 'roomPage');
bridge.regist(BridgeType.notice, 'getVideoId');
bridge.alias('getVideoId', 'videoPage');
bridge.regist(BridgeType.notice, 'scrollViewDidScroll');
bridge.alias('scrollViewDidScroll', 'didScroll');
bridge.regist(BridgeType.notice, 'gotoGuessCoinExchange');
bridge.regist(BridgeType.notice, 'webShare');
bridge.regist(BridgeType.notice, 'webShareShow');
bridge.regist(BridgeType.notice, 'getWebTitle');
bridge.alias('getWebTitle', 'setTitle');
bridge.regist(BridgeType.notice, 'gotoRecharge');
bridge.regist(BridgeType.notice, 'goBack');
bridge.regist(BridgeType.notice, 'jumpLiveCate');
```

### BridgeType 及 DealType

```js
export enum DealType {
    origin,
    json,
}

export enum BridgeType {
    async,
    sync,
    notice,
}
```

### api

```html
(method) Bridge.alias(bridgeName: string, alias: string): this
为bridge设置别名
```

```html
(method) Bridge.getCallbackStack(callbackName: string): AndroidBridgeCallback[]
获取安卓callbackstack
```

```html
(method) Bridge.getUserAgent(): string
获取userAgent
```

```html
(property) Bridge.isIOS: boolean
```

```html
(method) Bridge.pushCallbackStack(callbackName: string, callback: AndroidBridgeCallback): void
增加安卓callback监听
```

```html
(method) Bridge.regist(bridgeType: BridgeType, bridgeName: string, callbackName?: string | DealType, dealType?: DealType): this
注册一个bridge api
```

```html
(method) Bridge.registAndroidCallHandler(bridgeType: BridgeType, bridgeName: string, callbackName?: string | DealType, dealType?: DealType): this
注册一个安卓 bridge api
```

```html
(method) Bridge.registIOSCallHandler(bridgeName: string): void
注册一个ios bridge api
```

```html
(method) Bridge.registIOSRegisterHandler(handlerName: string, handler: registerHandlerCallback): this
注册一个由ios主动调用的js方法
```

```html
(method) Bridge.registerHandler(handlerName: string, handler: registerHandlerCallback): this
注册一个由native主动调用的js方法
```

```html
(method) Bridge.registAndroidRegisterHandler(handlerName: string, handler: registerHandlerCallback): this
注册一个由安卓主动调用的js方法
```

```html
(property) Bridge.ua: string
```
### 如何更换promise库

```js
import { Bridge } from '@geeeger/bridge';
import { Promise } from 'bluebird';

Bridge.Promise = bluebird.Promise;
```
