/* eslint-disable @typescript-eslint/no-explicit-any */
// 判断浏览器是否支持flash(老版本IE可能会报错)
const isInstallFlash = (): boolean => {
  try {
    const win: any = window;
    const nav: any = navigator;
    if (typeof win.ActiveXObject !== 'undefined') {
      return Boolean(new win.ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
    }
    return Boolean(nav.plugins['Shockwave Flash']);
  } catch (e) {
    return false;
  }
};
export default isInstallFlash;
