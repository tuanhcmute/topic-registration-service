import { headers } from "../utils/constants";
import axiosClient from "./axiosClient";

const baseUrl = "/user";
const userService = {
  fetchUserInfo: () => {
    const requestUrl = `${baseUrl}/profile`;
    return axiosClient.get(requestUrl);
  },
  updateBiographyInUserProfile: (data) => {
    const requestUrl = `${baseUrl}/profile`;
    return axiosClient.put(requestUrl, data);
  },
  fetchStudentsNotEnrolledInTopic: () => {
    const requestUrl = `${baseUrl}/student`;
    return axiosClient.get(requestUrl);
  },
  fetchAllLectures: () => {
    const requestUrl = `${baseUrl}/lecture`;
    return axiosClient.get(requestUrl);
  },
  updateAvatarInUserProfile: (file) => {
    const requestUrl = `${baseUrl}/profile/upload`;
    const formData = new FormData();
    formData.append("image", file);
    return axiosClient.put(requestUrl, formData, {
      headers: {
        [headers.CONTENT_TYPE]: headers.MULTIPART_FORM_DATA_VALUE,
      },
    });
  },
  fetchAllUsers: () => {
    const requestUrl = `${baseUrl}/admin`;
    return axiosClient.get(requestUrl);
  },
  createUser: (data) => {
    const requestUrl = `${baseUrl}/admin`;
    return axiosClient.post(requestUrl, data);
  },
};

export default userService;
