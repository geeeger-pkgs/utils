export default function isIOS(): boolean {
  return !!navigator.userAgent.match(/i(phone|pad|pod|os)/i);
}
