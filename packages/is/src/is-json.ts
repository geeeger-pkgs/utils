import isArray from './is-array';

export default function (value: string): boolean {
  try {
    const obj = JSON.parse(value);

    if (typeof obj === 'object' || isArray(value)) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}
