import express, { Application, Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cookieSession from "cookie-session";
import apiRoutes from "./routes";
import {
  errorHandler,
  corsMiddleware,
  authorizeUser,
  logMiddleware,
} from "@middlewares";
import { keys, db, passportSetup } from "@configs";

dotenv.config();

const app: Application = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(corsMiddleware);
app.use(
  cookieSession({
    maxAge: 10 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);
app.use(authorizeUser);
app.use(logMiddleware);

//initialize passport
app.use(passportSetup.initialize());
app.use(passportSetup.session());

// routes
apiRoutes.forEach((route) => {
  app.use("/api/v1", route.router);
});

// Hanlde 404 error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Page not found" });
});

// add error handler
app.use(errorHandler);

(async () => {
  try {
    // Attempt to authenticate with the database (assuming 'db' is your database object)
    await db.authenticate();
    console.info("Connection has been established successfully.");
    await db.sync();
    console.info("All models were synchronized successfully.");

    // If the database authentication is successful, start your Express.js application
    app.listen(process.env.PORT, () => {
      console.info("The app is listening on port " + process.env.PORT);
    });
  } catch (error) {
    await db.drop();
    console.error("Drop all tables defined through this sequelize instance");
    // If there is an error during database authentication, catch and handle it here
    console.error("Unable to connect to the database:", error);
  }
})();
