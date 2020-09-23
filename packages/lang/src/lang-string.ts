/* eslint-disable @typescript-eslint/no-explicit-any */
// 字符串工具
const string = {
  // 获取字符串字节长度
  bytelen: (s: string): number => {
    const len = s.length;
    const reg = /[^X00-XFF]/gi;
    const arr = s.match(reg);
    if (arr !== null) return len + arr.length * 2;
    return len;
  }, // 通过参数的方式拼接字符串
  // 通过占位符格式化字符串
  format: (...args: any): string => {
    const list = args;
    const s = list.shift();
    return s.replace(/{(\d+)}/g, (match: any, index: any) => {
      if (typeof list[index] !== 'undefined') {
        return list[index];
      }
      return match;
    });
  },
  join: (...args: any[]): string => args.join(''),
};
export default string;
