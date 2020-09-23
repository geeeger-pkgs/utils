import toString from './tostring';

export default function (arg: any) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return toString.call(arg) === '[object Array]';
}
