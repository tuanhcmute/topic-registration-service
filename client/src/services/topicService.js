import axiosClient from "./axiosClient";

const baseUrl = "/topic";
const topicService = {
  fetchAllTopicsInLectureEnrollmentPeriodByTypeAndLecture: (type) => {
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
  fetchAllTopicsIsNotApprovedDuringTheLectureEnrollmentPeriod: (type) => {
    const requestUrl = `${baseUrl}/head?type=${type}`;
    return axiosClient.get(requestUrl);
  },
  fetchAllTopicsApprovedDuringTheLectureEnrollmentPeriod: (type) => {
    const requestUrl = `${baseUrl}/head/division?type=${type}`;
    return axiosClient.get(requestUrl);
  },
  fetchAllApprovedTopicsInStudentEnrollmentPeriod: (type) => {
    const requestUrl = `${baseUrl}/student?type=${type}`;
    return axiosClient.get(requestUrl);
  },
};

export default topicService;
