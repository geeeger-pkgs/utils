/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sort-keys */
const VARS: any = {
  prefix: '$',
  keys: ['SYS', 'PAGE', 'DATA'],
  source: {},
  scope: window,
};
for (let i = 0; i < VARS.keys.length; i += 1) {
  const key = VARS.keys[i];
  const obj = VARS.scope[VARS.prefix + key];
  if (obj) {
    VARS.source[key.toLowerCase()] = obj;
  }
}
const setAll = (keys: any, value: any): void => {
  VARS.source[keys.toLowerCase()] = value;
};
/**
 * 根据“路由变量”在“上下文”中赋值
 * “路由变量”：str = 'a.b.c.d.e'
 * “上下文”：VARS.source
 * 例子：
 *        var menuId = get('sys.menuId')
 *        sys 对应于 VARS.keys[0]
 * 在路由赋值的过程中，如果遇到 undefined 则认为路由失败，直接返回 undefined
 */
const set = (str: any, value: any): void => {
  let cur = VARS.source;
  const ks = [];
  const ps = str.split('.');
  for (let i = 0; i < ps.length; i += 1) {
    const p = ps[i];
    cur = cur[p];
    ks.push(`["${ps[i]}"]`);
  }
  // 修改注意
  const fns = `VARS.source${ks.join('')}="${value}"`;
  /* eslint-disable */
  eval(`(${fns})`);
  /* eslint-enable */
};
/**
 * 根据 “路由变量” 在 “上下文” 中寻找值
 * “路由变量”：str = 'a.b.c.d.e'
 * “上下文”： VARS.source
 * 例子：
 *      var menuId = get('sys.menuId')
 *      vars 对应于 VARS.keys[1]
 * 在路由寻找的过程中，如果遇到 undefined 则认为路由失败，直接返回 undefined
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const get = <T = any>(str: string): T => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let tar: any = VARS.source;
  const path = str.split('.');
  for (let i = 0; i < path.length; i += 1) {
    tar = tar[path[i]];
    if (tar === undefined) {
      return tar;
    }
  }
  return tar;
};
export { set, setAll, get };
