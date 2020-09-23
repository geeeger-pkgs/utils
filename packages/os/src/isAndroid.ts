export default function isAndroid(): boolean {
  return !!navigator.userAgent.match(/android/i);
}
