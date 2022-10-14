const LOGGING_ENABLED = false;

export const consoleLog = (message?: any) => {
    if (LOGGING_ENABLED) {
        console.log(message);
    }
}