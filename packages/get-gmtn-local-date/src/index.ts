export default function getGMTNLocalDate(unixTimestamp: number, n = 8): Date {
  let t = unixTimestamp * 1000;
  const TIMEZONE_OFFSET = new Date().getTimezoneOffset() * 1 * 60 * 1000;
  const GMTNOFFSET = n * 1 * 60 * 60 * 1000;
  t = t + TIMEZONE_OFFSET;
  t = t + GMTNOFFSET;
  return new Date(t);
}
