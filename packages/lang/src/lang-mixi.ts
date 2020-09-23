/* eslint-disable @typescript-eslint/no-explicit-any */
import each from './lang-each';

// 合并对象
const mixi = <T = any>(...obj: any): T => {
  const target: any = obj.shift();
  const srcs: any = obj;
  each(srcs, (o: any) => {
    const src = o.prototype || o;
    Object.keys(src).forEach((name: any) => {
      const val = src[name];
      if (val !== undefined) {
        target[name] = val;
      }
    });
  });
  return target;
};
export default mixi;
