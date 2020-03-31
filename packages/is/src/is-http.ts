export default function (link: string): boolean {
    return Boolean(link && link.match(/^https?:/i));
}
