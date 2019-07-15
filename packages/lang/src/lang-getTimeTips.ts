/**
 *
 * @param nowTime unix timestamp
 * @param hisTime unix timestamp
 */
const { floor } = Math;
export default function getTimeTips(nowTime: number, hisTime: number) {
    const gap = nowTime - hisTime;
    if (gap >= 604800) {
        return '很久以前';
    }

    if (gap >= 86400) {
        return `${floor(gap / 86400)}天前`;
    }

    if (gap >= 3600) {
        return `${floor(gap / 3600)}小时前`;
    }

    if (gap >= 60) {
        return `${floor(gap / 60)}分钟前`;
    }

    return '刚刚';
}
