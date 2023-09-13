import express, { Application, Request, Response, NextFunction } from "express";

import db from "./configs/db.config";
import dotenv from "dotenv";
import apiRoutes from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app: Application = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routes
apiRoutes.forEach((route) => {
  app.use("/api/v1", route.router);
});

// Hanlde 404 error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Page not found" });
});

app.use((error: Error, req: Request, res: Response, next: Function) => {
  console.log(error.message);
  res.status(500).json({ message: "Internal Server Error" });
});

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
