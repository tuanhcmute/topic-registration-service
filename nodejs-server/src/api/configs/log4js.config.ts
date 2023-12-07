import * as log4js from "log4js";
// Configure log4js
log4js.configure({
  appenders: {
    console: {
      type: "console"
    }
  },
  categories: { default: { appenders: ["console"], level: "debug" } }
});

export const logger = log4js.getLogger();
