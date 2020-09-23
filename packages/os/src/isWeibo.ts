export default function isWeibo(): boolean {
  return !!navigator.userAgent.match(/(weibo).*weibo__([\d.]+)/i);
}
