export function getVersion(): string {
    if (process.env.VERSION === undefined) {
        return "DEVELOPMENT";
    } else {
        return process.env.VERSION;
    }
}