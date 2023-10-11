import dotenv from "dotenv";

dotenv.config();

export const keys = {
  google: {
    clientId: process.env.CLIENT_ID || "clientId",
    clientSecret: process.env.CLIENT_SECRET || "secret",
    callbackURL: process.env.REDIRECT_URI || "uri",
  },
  session: {
    cookieKey: "ajsgfjsdjfhsdjfksdkfjksd",
  },
  db: {
    development: {
      dbName: process.env.DB_NAME || "authentication_demo",
      dbUser: process.env.DB_USER || "springstudent",
      dbPassword: process.env.DB_PASSWORD || "springstudent",
      dbHost: process.env.DB_HOST || "localhost",
    },
    test: {},
    production: {},
  },
};
