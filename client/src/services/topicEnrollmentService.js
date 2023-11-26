//enrollmentPeriodService.js
import axiosClient from "./axiosClient";

const baseUrl = "/topic-enrollment";
const topicEnrollmentService = {
  deleteTopicEnrollment: (ntid) => {
    const requestUrl = `${baseUrl}?ntid=${ntid}`;
    return axiosClient.delete(requestUrl);
  },
  createTopicEnrollment: (data) => {
    const requestUrl = `${baseUrl}`;
    return axiosClient.post(requestUrl, data);
  },
  fetchTopicEnrollmentsByNtid: () => {
    const requestUrl = `${baseUrl}`;
    return axiosClient.get(requestUrl);
  },
};

export default topicEnrollmentService;
