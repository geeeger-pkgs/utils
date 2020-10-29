/* eslint-disable @typescript-eslint/no-explicit-any */
import toString from './tostring';

export default function (arg: any): boolean {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return toString.call(arg) === '[object Array]';
}
