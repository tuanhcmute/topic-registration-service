import dotenv from "dotenv";

dotenv.config();

export const keys = {
  google: {
    clientId: process.env.CLIENT_ID || "CLIENT_ID",
    clientSecret: process.env.CLIENT_SECRET || "CLIENT_SECRET",
    callbackURL: process.env.REDIRECT_URI || "REDIRECT_URI",
  },
  session: {
    cookieKey: "91e6b6a4035f4727bc5a74424e0f75dc",
  },
  db: {
    development: {
      dbName: process.env.DB_NAME || "DB_NAME_DEV",
      dbUser: process.env.DB_USER || "DB_USER_DEV",
      dbPassword: process.env.DB_PASSWORD || "DB_PASSWORD_DEV",
      dbHost: process.env.DB_HOST || "DB_HOST_DEV",
    },
    test: {},
    production: {
      dbName: process.env.DB_NAME || "DB_NAME_PROD",
      dbUser: process.env.DB_USER || "DB_USER_PROD",
      dbPassword: process.env.DB_PASSWORD || "DB_PASSWORD_PROD",
      dbHost: process.env.DB_HOST || "DB_HOST_PROD",
    },
  },
};
