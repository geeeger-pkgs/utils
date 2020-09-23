# `face-converter`

> 表情符号转换工具

## Usage

```
import Converter from '@geeeger/face-converter';

describe('test', () => {
    test('should pass', () => {
        const faceList = [
            '01',
        ];
        const webUrl = '/';
        const staticPath = 'a/';
        const converter = new Converter(
            faceList,
            webUrl,
            staticPath
        );
        expect(converter.getPath('1')).toEqual('/a/1.png');
        expect(converter.getImgTag('1')).toEqual('<img rel="1" src="/a/1.png">');
        expect(converter.convert('[emot:01]')).toEqual('<img rel="01" src="/a/01.png">');
    });
});
```
