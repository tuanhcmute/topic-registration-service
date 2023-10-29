import axiosClient from "./axiosClient";

const baseUrl = "/topic";
const topicService = {
  getAllTopicsInLectureEnrollmentPeriod: (type) => {
    const requestUrl = `${baseUrl}/lecture?type=${type}`;
    return axiosClient.get(requestUrl);
  },
  createNewTopicInLectureEnrollmentPeriod: (data) => {
    const requestUrl = `${baseUrl}/lecture`;
    return axiosClient.post(requestUrl, data);
  },
  updateTopicInLectureEnrollmentPeriod: (data) => {
    const requestUrl = `${baseUrl}/lecture`;
    return axiosClient.put(requestUrl, data);
  },
};

export default topicService;
