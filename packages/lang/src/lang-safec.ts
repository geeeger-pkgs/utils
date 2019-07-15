// 执行
const safec = (fn: any, isPrint: any = false) => {
    try {
        fn();
    } catch (e) {
        if (isPrint) {
            console.error(e);
        }
    }
};
export default safec;
