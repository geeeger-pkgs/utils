// 获取字符串字节长度
const getByteLen = (val: string) => {
    const len = val.length;
    const reg = /[^X00-XFF]/ig;
    const arr = val.match(reg);
    if (arr !== null) return len + arr.length * 2;
    return len;
};
export default getByteLen;
