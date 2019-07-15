// 高性能时钟循环器
const interval = (fn: any, step: any, right: any = false) => {
    setTimeout(() => {
        if (fn() !== false) {
            interval(fn, step);
        }
    }, step);
    if (right === true) {
        fn();
    }
};
export default interval;
