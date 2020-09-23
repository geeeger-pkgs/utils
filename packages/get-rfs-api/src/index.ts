/* eslint-disable @typescript-eslint/no-explicit-any */
export default function getRFSAPI(): string {
  const fake = document.createElement('video') as any;
  if (fake.requestFullscreen) {
    return 'requestFullscreen';
  } else if (fake.webkitRequestFullscreen) {
    return 'webkitRequestFullscreen';
  } else if (fake.webkitEnterFullscreen) {
    return 'webkitEnterFullscreen';
  }
  return '';
}
