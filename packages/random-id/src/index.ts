export default function randomId(): string {
  return `id${Math.random().toString().replace('.', '')}`;
}
