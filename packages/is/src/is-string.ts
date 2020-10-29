/* eslint-disable @typescript-eslint/no-explicit-any */
import toString from './tostring';

export default function (arg: any): boolean {
  return toString.call(arg) === '[object String]';
}
