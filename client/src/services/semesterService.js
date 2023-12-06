import axiosClient from "./axiosClient";

const baseUrl = "/semester";
const semesterService = {
  fetchAllSemesters: () => {
    const requestUrl = `${baseUrl}`;
    return axiosClient.get(requestUrl);
  },
};

export default semesterService;
