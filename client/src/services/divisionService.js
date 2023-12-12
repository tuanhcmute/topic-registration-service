import axiosClient from "./axiosClient";

const baseUrl = "/division";
const divisionService = {
  createDivisionByTopicType: (type, data) => {
    const requestUrl = `${baseUrl}?topicType=${type}`;
    return axiosClient.post(requestUrl, data);
  },
  fetchDivisionByTopicType: (type) => {
    const requestUrl = `${baseUrl}?topicType=${type}`;
    return axiosClient.get(requestUrl);
  },
  fetchDivisionByTopic: (topicId) => {
    const requestUrl = `${baseUrl}/${topicId}`;
    return axiosClient.get(requestUrl);
  },
};

export default divisionService;
