export class DateTimeUtils {
    static timeAgo(date: string) {
        const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

        const then = new Date(date).getTime();
        // eslint-disable-next-line react-hooks/purity
        const now = Date.now();
        const diff = now - then;

        const minutes = diff / 1000 / 60;
        const hours = minutes / 60;
        const days = hours / 24;

        if (minutes < 60) return formatter.format(Math.round(-minutes), "minute");
        if (hours < 24)   return formatter.format(Math.round(-hours), "hour");
        return formatter.format(Math.round(-days), "day");
    }
}
