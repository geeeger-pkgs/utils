export default function isWX(): boolean {
  return !!navigator.userAgent.match(/micromessenger/i);
}
