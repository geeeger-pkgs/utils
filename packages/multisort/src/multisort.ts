function compare(arg: string|any, helper: any = (a: any) => a, direction: number = 1): any {
    let self = (a: any, b: any): number => b - a;
    if ((typeof (arg)).toLowerCase() === 'string') {
        const prop = arg;
        const func = (a: any): any => helper(a[prop]);
        self = (a: any, b: any): number => func(b) - func(a);
    }
    if ((typeof (arg)).toLowerCase() === 'function') {
        const func = arg;
        self = (a: any, b: any): number => func(helper(a), helper(b));
    }
    return (a: any, b: any): number => direction * self(a, b);
}

function then (this: any, arg: string|any, helper?: any, direction?: number): any {
    let nextCompare: any = compare(arg, helper, direction);
    if ((typeof (this)).toLowerCase() === 'function') {
        const thisCompare = nextCompare;
        const prevCompare = this;
        nextCompare = function func(a: any, b: any): any {
            return prevCompare(a, b) || thisCompare(a, b);
        };
    }
    nextCompare.then = then;
    return nextCompare;
}

export default then;
