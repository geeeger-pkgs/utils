// 遍历
const each = (o: any, next: any) => {
    const { toString } = Object.prototype;
    if (toString.call(o) === '[object Object]') {
        Object.keys(o).forEach((key) => {
            next(o[key], key);
        });
    } else if (toString.call(o) === '[object Array]') {
        for (let i = 0; i < o.length; i += 1) {
            next(o[i], i);
        }
    }
};
export default each;
