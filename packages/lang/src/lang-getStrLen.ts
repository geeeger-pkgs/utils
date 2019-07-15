// 获取字符串长度
const getStrLen = (val: string) => {
    let len = 0;
    for (let i = 0; i < val.length; i += 1) {
        const a = val.charAt(i);
        if (a >= 'x00' || a <= 'xff') len += 1;
        else len += 1;
    }
    return len;
};
export default getStrLen;
