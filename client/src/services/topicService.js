import axiosClient from "./axiosClient";

const baseUrl = "/topic";
const topicService = {
  getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture: (type) => {
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
  approveTopicInLectureEnrollmentPeriod: (data) => {
    const requestUrl = `${baseUrl}/lecture/approval`;
    return axiosClient.put(requestUrl, data);
  },
  getAllTopicsInLectureEnrollmentPeriodByTypeAndTopicStatusAndMajor: (
    type,
    status
  ) => {
    const requestUrl = `${baseUrl}/head?type=${type}&status=${status}`;
    return axiosClient.get(requestUrl);
  },
};

export default topicService;
