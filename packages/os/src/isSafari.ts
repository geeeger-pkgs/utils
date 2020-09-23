import isIOS from './isIOS';

export default function isSafari(): boolean {
  const ua = navigator.userAgent;
  return (
    /safari\/([\d.]+)$/i.test(ua) &&
    isIOS() &&
    ua.indexOf('Crios') < 0 &&
    ua.indexOf('Mozilla') === 0
  );
}
