/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Screen {
    deviceXDPI: any;
    logicalXDPI: any;
  }
}

function isUndef(arg: any): boolean {
  return typeof arg === 'undefined';
}

export default function getScreenRatio(): number {
  const win = window;
  const { screen } = win;
  const ua = win.navigator.userAgent;
  let ratio = 100;

  if (win.devicePixelRatio) {
    ratio = win.devicePixelRatio;
  } else if (ua.indexOf('msie') > -1) {
    if (!isUndef(screen.deviceXDPI) && typeof !isUndef(screen.logicalXDPI)) {
      ratio = (screen.deviceXDPI / screen.logicalXDPI) as number;
    }
  } else if (!isUndef(win.outerWidth) && !isUndef(window.innerWidth)) {
    ratio = window.outerWidth / window.innerWidth;
  }

  if (ua.indexOf('mac') > -1) {
    ratio /= 2;
  }

  ratio = Math.round(ratio * 100);

  if (ratio === 99 || ratio === 101) {
    ratio = 100;
  }
  return ratio;
}
