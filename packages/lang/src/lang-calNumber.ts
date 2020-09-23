// num-万-字处理 a为要处理的数字 b为保留的小数位数
const OverFlowNumber = 10000;
const calNumber = (a: number, b: number): string => {
  if (a < OverFlowNumber) {
    return (a > 0 ? a : 0) + '';
  }
  return `${(Math.round((a / OverFlowNumber) * 100) / 100).toFixed(b > 1 ? b : 1)}万`;
};
export default calNumber;
