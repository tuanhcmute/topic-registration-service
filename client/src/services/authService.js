import axiosClient from "./axiosClient";

const baseUrl = "/auth";
const authService = {
  refreshToken(data) {
    const requestUrl = `${baseUrl}/refresh-token`;
    return axiosClient.post(requestUrl, data);
  },
};

export default authService;
