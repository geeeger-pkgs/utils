// num-万-字处理 a为要处理的数字 b为保留的小数位数
const calNumber = (a: number, b: number) => {
    if (a < 10000) return a > 0 ? a : 0;
    return `${(Math.round(a / 10000 * 100) / 100).toFixed(b > 1 ? b : 1)}万`;
};
export default calNumber;
