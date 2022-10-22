export function trimToLength(length: number, content: string): string {
    return content.length > length ? `${content.slice(0, Math.max(0, length - 3))}...` : content;
}
