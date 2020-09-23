export default function isQzone(): boolean {
  return navigator.userAgent.indexOf('Qzone/') !== -1;
}
