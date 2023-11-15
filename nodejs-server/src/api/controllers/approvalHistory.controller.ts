import { logger } from "@configs";
import { ValidateFailException } from "@exceptions";
import { approvalHistoryService } from "@services";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

class ApprovalHistoryController {
  public async getApprovalHistoryByTopicId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const topicId = req.query["topicId"] as string;
      logger.info("Topic id:", topicId);
      // Validate topicId
      if (_.isNull(topicId) || _.isUndefined(topicId) || _.isEmpty(topicId))
        throw new ValidateFailException("Topic id is not valid");
      // Response
      res
        .status(StatusCodes.OK)
        .json(
          await approvalHistoryService.getApprovalHistoryByTopicId(topicId)
        );
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default new ApprovalHistoryController();
