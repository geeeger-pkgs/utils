export default function isOriginalChrome(): boolean {
  return /chrome\/[\d.]+ Mobile Safari\/[\d.]+/i.test(navigator.userAgent);
}
