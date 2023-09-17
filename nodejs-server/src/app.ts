import express, { Application, Request, Response, NextFunction } from "express";

import db from "./configs/db.config";
import dotenv from "dotenv";
import apiRoutes from "./routes";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware";
dotenv.config();

const app: Application = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Controll-Allow-Origin", "*");
  res.setHeader("Access-Controll-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Controll-Allow-Headers", "Content-Type, Authorization");
  next();
});

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
    console.log("Connection has been established successfully.");

    // If the database authentication is successful, start your Express.js application
    app.listen(process.env.PORT, () => {
      console.log("The app is listening on port " + process.env.PORT);
    });
  } catch (error) {
    // If there is an error during database authentication, catch and handle it here
    console.error("Unable to connect to the database:", error);
  }
})();
