const styleLog = "color: #00bcd4; font-weight: bold;";
const styleWarn = "color: orange; font-weight: bold;";
const styleError = "color: red; font-weight: bold;";

export const logger = {
  log: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`%c[LOG] ${message}`, styleLog, ...args);
    }
  },
  warn: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`%c[WARN] ⚠️ ${message}`, styleWarn, ...args);
    }
  },
  error: (message: string, ...args: any[]) => {
    console.error(`%c[ERROR] ❌ ${message}`, styleError, ...args);
  },
};
