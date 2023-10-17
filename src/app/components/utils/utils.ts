export function generateRandomId(length: number = 24): string {
    return [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}
