// IE浏览器版本判断
const getBrowserV = (num: number) => {
    const DEFAULT_VERSION = num || 8;
    const ua = navigator.userAgent.toLowerCase();
    const isIE = ua.indexOf('msie') > -1;
    if (isIE) {
        const tt = ua.match(/msie ([\d.]+)/) || [0, 0];
        // console.log("ieVersion=" + (ieVersion | 0));
        const ver = Math.floor(Number(tt[1]));
        if (ver <= DEFAULT_VERSION) {
            return false;
        }
    }
    return true;
};
export default getBrowserV;
