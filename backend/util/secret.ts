export function getSecret(): string {
    return process.env.SECRET || 'secret';
}
