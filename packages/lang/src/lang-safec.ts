/* eslint-disable @typescript-eslint/no-explicit-any */
// 执行
const safec = (fn: any, isPrint: any = false): void => {
  try {
    fn();
  } catch (e) {
    if (isPrint) {
      console.error(e);
    }
  }
};
export default safec;
