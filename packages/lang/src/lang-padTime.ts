export default function padTime(time: number): string {
  if (time < 10) {
    return `0${time}`;
  }
  return String(time);
}
