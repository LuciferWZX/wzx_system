import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

/**
 * 获取几秒前，几分钟前等等
 * @param timestamp
 */
export function getRelativeTime(timestamp:number) {
    const now = dayjs();
    const localTime = dayjs(timestamp);
    const diffInSeconds = now.diff(localTime, 'second');
    return localTime.from(now);
}
