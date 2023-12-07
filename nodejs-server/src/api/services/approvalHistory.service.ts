import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import { ValidateFailException } from "@exceptions";
import { IListApprovalHistoryReponse, IResponseModel, ResponseModelBuilder } from "@interfaces";
import { ApprovalHistory } from "@models";
import { logger } from "@configs";

class ApprovalHistoryService {
  public async getApprovalHistoryByTopicId(topicId: string): Promise<IResponseModel<IListApprovalHistoryReponse>> {
    // Validate topicId
    if (_.isNull(topicId) || _.isUndefined(topicId) || _.isEmpty(topicId))
      throw new ValidateFailException("Topic id is not valid");

    // Get data
    const approvalHistories = await ApprovalHistory.findAll({
      where: {
        topicId: topicId
      }
    });
    console.info({ approvalHistories: approvalHistories.length });

    // Build response
    const data: IListApprovalHistoryReponse = { approvalHistories };
    return new ResponseModelBuilder<IListApprovalHistoryReponse>()
      .withStatusCode(StatusCodes.OK)
      .withMessage("Approval histories have been successfully retrieved")
      .withData(data)
      .build();
  }
  public async createApprovalHistory() {}
}

export default new ApprovalHistoryService();
