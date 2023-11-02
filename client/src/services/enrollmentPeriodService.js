//enrollmentPeriodService.js
import axiosClient from "./axiosClient";

const baseUrl = "/enrollment-period";
const enrollmentPeriodService = {
  getEnrollmentPeriodByTopicTypeAndPeriodCode: (topicType, periodCode) => {
    const requestUrl = `${baseUrl}?type=${topicType}&period=${periodCode}`;
    return axiosClient.get(requestUrl);
  },
};

export default enrollmentPeriodService;
