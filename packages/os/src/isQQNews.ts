export default function isQQNews(): boolean {
  return !!navigator.userAgent.match(/qqnews/i);
}
