  export function createdAtFormater(time: string, now: Date = new Date()) {
    const createdAt = new Date(time);
    if (isNaN(createdAt.getTime())) return "";

    const diffMs = Math.max(0, now.getTime() - createdAt.getTime());
    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(minutes / 60);

    if (minutes < 1) return "Just now";
    if (minutes < 60)
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;

    const startOfDay = (d: Date) =>
      new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const daysAgo = Math.round(
      (startOfDay(now) - startOfDay(createdAt)) / 86400000,
    );
    if (daysAgo === 1) return "Yesterday";

    return createdAt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }