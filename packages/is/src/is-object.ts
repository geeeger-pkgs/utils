import toString from './tostring';

export default function(arg: any): boolean {
    return toString.call(arg) === '[object Object]';
}
