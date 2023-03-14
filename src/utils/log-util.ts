const LOGGING_ENABLED = false;

export const consoleLog = (message?: any, tag?: string) => {
    if (LOGGING_ENABLED) {
        if (tag) {
            console.log(tag, message);
        } else {
            console.log(message);
        }
    }
}