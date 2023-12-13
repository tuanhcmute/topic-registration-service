import axiosClient from "./axiosClient";

const baseUrl = "/semester";
const semesterService = {
  fetchAllSemesters: (pageNumber, itemsPerPage, sortBy) => {
    const requestUrl = `${baseUrl}?pageNumber=${pageNumber}&pageSize=${itemsPerPage}&sortBy=${sortBy}`;
    return axiosClient.get(requestUrl);
  },
  createSemester: (data) => {
    const requestUrl = `${baseUrl}`;
    return axiosClient.post(requestUrl, data);
  },
  updateSemester: (id, data) => {
    const requestUrl = `${baseUrl}/${id}`;
    return axiosClient.put(requestUrl, data);
  },
};

export default semesterService;
