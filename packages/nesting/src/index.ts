/* eslint-disable @typescript-eslint/no-explicit-any */
enum DataType {
  String,
  Number,
  Boolean,
  Undef,
  Null,
}

function defaultValue(type: DataType): any {
  if (type === DataType.Boolean) {
    return false;
  }
  if (type === DataType.Null) {
    return null;
  }
  if (type === DataType.Number) {
    return 0;
  }
  if (type === DataType.String) {
    return '';
  }
  if (type === DataType.Undef) {
    return undefined;
  }
  return undefined;
}
export default class Nesting {
  public static DataType = DataType;
  public data: any;

  public constructor(nestObject = {}) {
    this.data = nestObject;
  }

  public get<T = any>(path?: string, type: DataType = DataType.String): T {
    if (typeof path === 'undefined') {
      return this.data;
    }
    return this.walk(path.split('.'), this.data, type);
  }

  private walk(path: string[], ret: any, type: DataType): any {
    if (ret === undefined) {
      return defaultValue(type);
    }
    if (!path.length) {
      return ret;
    }
    const next = path.shift();
    if (next === undefined) {
      return defaultValue(type);
    }
    return this.walk(path, ret[next], type);
  }
}
