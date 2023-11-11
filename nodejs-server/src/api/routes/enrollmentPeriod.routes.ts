import { IRoutes } from "@interfaces";
import { Router } from "express";

class EnrollmentPeriodRoutes implements IRoutes {
  public path = "enrollment-period";
  public router = Router();
}
