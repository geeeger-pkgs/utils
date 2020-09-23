/* eslint-disable @typescript-eslint/no-explicit-any */
export default function isWXMP(): boolean {
  return !!(
    navigator.userAgent.match(/miniprogram/i) ||
    (window as any).__wxjs_environment === 'miniprogram'
  );
}
