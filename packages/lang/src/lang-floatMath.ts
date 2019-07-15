// 浮点数工具
const floatMath = {
    // 加法计算
    accAdd: (arg1: any, arg2: any, num: any) => {
        let r1 = 0; let r2 = 0;
        let m = 0; let bum = num;
        try {
            r1 = arg1.toString().split('.')[1].length;
        } catch (e) {
            /** */
        }
        try {
            r2 = arg2.toString().split('.')[1].length;
        } catch (e) {
            /** */
        }
        m = 10 ** Math.max(r1, r2);
        if (typeof (bum) === 'undefined' || bum < 1) {
            bum = 2;// 默认保留2位小数
        }
        return ((arg1 * m + arg2 * m) / m).toFixed(bum);
    },
    // 减法计算
    Subtr: (arg1: any, arg2: any, num: any) => {
        let r1 = 0; let r2 = 0; let m = 0; let bum = num;
        try {
            r1 = arg1.toString().split('.')[1].length;
        } catch (e) {
            /** */
        }
        try {
            r2 = arg2.toString().split('.')[1].length;
        } catch (e) {
            /** */
        }
        m = 10 ** Math.max(r1, r2);
        if (typeof (bum) === 'undefined' || bum < 1) {
            bum = 2;// 默认保留2位小数
        }
        return ((arg1 * m - arg2 * m) / m).toFixed(bum);
    },
    // 除法计算
    accDiv: (arg1: any, arg2: any) => {
        let t1 = 0; let t2 = 0;
        const s1 = arg1.toString();
        const s2 = arg2.toString();
        try {
            t1 = s1.split('.')[1].length;
        } catch (e) {
            /** */
        }
        try {
            t2 = s2.split('.')[1].length;
        } catch (e) {
            /** */
        }
        return (Number(s1.replace('.', '')) / Number(s2.replace('.', '')) * (10 ** (t2 - t1)));
    },
    // 乘法计算
    accMul: (arg1: any, arg2: any) => {
        let m = 0;
        const s1 = arg1.toString();
        const s2 = arg2.toString();
        try {
            m += s1.split('.')[1].length;
        } catch (e) {
            /** */
        }
        try {
            m += s2.split('.')[1].length;
        } catch (e) {
            /** */
        }
        return (Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / (10 ** m));
    },
};
export default floatMath;
