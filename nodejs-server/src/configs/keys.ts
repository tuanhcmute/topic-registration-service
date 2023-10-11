import dotenv from "dotenv";

dotenv.config();

export const keys = {
  google: {
    clientId: process.env.CLIENT_ID || "clientID",
    clientSecret: process.env.CLIENT_SECRET || "clientSecret",
    callbackURL: process.env.REDIRECT_URI,
  },
  session: {
    cookieKey: "ajsgfjsdjfhsdjfksdkfjksd",
  },
  db: {
    development: {
      dbName: process.env.DB_NAME || "authentication_demo",
      dbUser: process.env.DB_USER || "thanhduy",
      dbPassword: process.env.DB_PASSWORD || "root",
      dbHost: process.env.DB_HOST || "localhost",
    },
    test: {},
    production: {},
  },
  mail: {
    host: process.env.MAIL_HOST || "sandbox.smtp.mailtrap.io",
    port: process.env.MAIL_PORT || 465,
    username: process.env.MAIL_USERNAME || "username",
    password: process.env.MAIL_PASSWORD || "password",
  },
};
