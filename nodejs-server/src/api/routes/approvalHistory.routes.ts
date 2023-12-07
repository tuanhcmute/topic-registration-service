import { Router } from "express";
import { IRoutes } from "@interfaces";
import { approvalHistoryController } from "@controllers";

class ApprovalHistoryRoutes implements IRoutes {
  public path = "/approval-history";
  public router = Router();
  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes(): void {
    this.router.get(this.path, approvalHistoryController.getApprovalHistoryByTopicId);
  }
}

export default new ApprovalHistoryRoutes();
