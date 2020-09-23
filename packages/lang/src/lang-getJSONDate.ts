/* eslint-disable sort-keys */
/**
 * 获取json格式的日期，便于操作
 * @param timeStamp 时间戳
 * @param isUnixTimeStamp 是否是Unix时间戳
 */
export default function getJSONDate(
  timeStamp: number,
  isUnixTimeStamp?: boolean
): {
  y: number;
  M: number;
  d: number;
  day: number;
  h: number;
  m: number;
  s: number;
  ms: number;
} {
  let date: Date;
  if (isUnixTimeStamp) {
    date = new Date(timeStamp * 1000);
  } else {
    date = new Date(timeStamp);
  }
  return {
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    day: date.getDay(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    ms: date.getMilliseconds(),
  };
}
