// 字符串工具
const string = {
    // 通过参数的方式拼接字符串
    join: (...args: any[]) => args.join(''),

    // 通过占位符格式化字符串
    format: (...args: any) => {
        const list = args;
        const s = list.shift();
        return s.replace(
            /{(\d+)}/g,
            (match: any, index: any) => {
                if (typeof list[index] !== 'undefined') {
                    return list[index];
                }
                return match;
            }
        );
    },
    // 获取字符串字节长度
    bytelen: (s: string) => {
        const len = s.length;
        const reg = /[^X00-XFF]/ig;
        const arr = s.match(reg);
        if (arr !== null) return len + arr.length * 2;
        return len;
    },
};
export default string;
