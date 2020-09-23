export default function isQQ(): boolean {
  return !!navigator.userAgent.match(/QQ\/([\d.]+)/);
}
