//enrollmentPeriodService.js
import axiosClient from "./axiosClient";

const baseUrl = "/enrollment-period";
const enrollmentPeriodService = {
  fetchActivatedEnrollmentPeriod: (topicType) => {
    const requestUrl = `${baseUrl}?type=${topicType}`;
    return axiosClient.get(requestUrl);
  },
  fetchEnrollmentPeriodBySemesterId: (semesterId) => {
    const requestUrl = `${baseUrl}/all?semesterId=${semesterId}`;
    return axiosClient.get(requestUrl);
  },
  createEnrollmentPeriod: (semesterId, data) => {
    const requestUrl = `${baseUrl}?semesterId=${semesterId}`;
    return axiosClient.post(requestUrl, data);
  },
  updateEnrollmentPeriod: (id, data) => {
    const requestUrl = `${baseUrl}/${id}`;
    return axiosClient.put(requestUrl, data);
  },
};

export default enrollmentPeriodService;
