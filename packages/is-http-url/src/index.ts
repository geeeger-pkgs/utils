export default function isHTTPLink(link: string): boolean {
  return Boolean(link && link.match(/^(https?:)?\/\//i));
}
