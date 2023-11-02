import axiosClient from "./axiosClient";

const baseUrl = "/approval-history";
const approvalHistoryService = {
  getApprovalHistoryByTopicId: (data) => {
    const requestUrl = `${baseUrl}?topicId=${data}`;
    return axiosClient.get(requestUrl);
  },
};

export default approvalHistoryService;
