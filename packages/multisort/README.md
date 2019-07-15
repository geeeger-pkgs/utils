# `multisort`

> 多条件排序工具

## Usage

```
import MultiSort from '@geeeger/multisort';

declare global {
    interface Window {
        [key: string]: any;
    }
}

describe('test multiSort', () => {
    const data = [{
        onlineNum: '25.7万',
        isOnLive: false,
        fansNum: 17700,
    },
    {
        onlineNum: '11.7万',
        isOnLive: true,
        fansNum: 2333,
    },
    {
        onlineNum: '15万',
        isOnLive: true,
        fansNum: 111,
    },
    {
        onlineNum: '12.6万',
        isOnLive: false,
        fansNum: 123456,
    },
    {
        onlineNum: 1000,
        isOnLive: false,
        fansNum: 1000,
    },
    {
        onlineNum: 1000,
        isOnLive: false,
        fansNum: 17700,
    },
    {
        onlineNum: 1000,
        isOnLive: true,
        fansNum: 2333,
    }];

    const single = [{
        onlineNum: '12.6万',
        isOnLive: false,
        fansNum: 123456,
    },
    {
        onlineNum: '25.7万',
        isOnLive: false,
        fansNum: 17700,
    },
    {
        onlineNum: 1000,
        isOnLive: false,
        fansNum: 17700,
    },
    {
        onlineNum: '11.7万',
        isOnLive: true,
        fansNum: 2333,
    },
    {
        onlineNum: 1000,
        isOnLive: true,
        fansNum: 2333,
    },
    {
        onlineNum: 1000,
        isOnLive: false,
        fansNum: 1000,
    },
    {
        onlineNum: '15万',
        isOnLive: true,
        fansNum: 111,
    },
    ];

    const singleReverse = [{
        onlineNum: '15万',
        isOnLive: true,
        fansNum: 111,
    },
    {
        onlineNum: 1000,
        isOnLive: false,
        fansNum: 1000,
    },
    {
        onlineNum: '11.7万',
        isOnLive: true,
        fansNum: 2333,
    },
    {
        onlineNum: 1000,
        isOnLive: true,
        fansNum: 2333,
    },
    {
        onlineNum: '25.7万',
        isOnLive: false,
        fansNum: 17700,
    },
    {
        onlineNum: 1000,
        isOnLive: false,
        fansNum: 17700,
    },
    {
        onlineNum: '12.6万',
        isOnLive: false,
        fansNum: 123456,
    }];

    test('test single prop', () => {
        const newData = data.sort(
            MultiSort('fansNum')
        );
        expect(JSON.stringify(newData)).toBe(JSON.stringify(single));
    });
    test('test single prop reverse', () => {
        const newData = data.sort(
            MultiSort('fansNum', (a: any) => a, -1)
        );
        expect(JSON.stringify(newData)).toBe(JSON.stringify(singleReverse));
    });
    test('test single func reverse', () => {
        const newData = data.sort(
            MultiSort((a: any, b: any) => a.fansNum - b.fansNum)
        );
        expect(JSON.stringify(newData)).toBe(JSON.stringify(singleReverse));
    });
    test('test multil props with funcs', () => {
        function transNum (num: any) {
            if ((typeof (num)).toLowerCase() === 'string' && num.indexOf('万') !== -1) {
                return parseFloat(num) * 100000;
            }
            return num;
        }
        const newData = data.sort(
            MultiSort((a: any, b: any) => Number(b.isOnLive) - Number(a.isOnLive))
                .then('onlineNum', transNum)
                .then('fansNum'),
        );
        expect(JSON.stringify(newData)).toBe(JSON.stringify([
            {
                onlineNum: '15万',
                isOnLive: true,
                fansNum: 111,
            },
            {
                onlineNum: '11.7万',
                isOnLive: true,
                fansNum: 2333,
            },
            {
                onlineNum: 1000,
                isOnLive: true,
                fansNum: 2333,
            },
            {
                onlineNum: '25.7万',
                isOnLive: false,
                fansNum: 17700,
            },
            {
                onlineNum: '12.6万',
                isOnLive: false,
                fansNum: 123456,
            },
            {
                onlineNum: 1000,
                isOnLive: false,
                fansNum: 17700,
            },
            {
                onlineNum: 1000,
                isOnLive: false,
                fansNum: 1000,
            },
        ]));
    });
});

```
