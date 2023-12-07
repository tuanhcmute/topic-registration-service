import axiosClient from "./axiosClient";
import { headers } from "../utils/constants";

const baseUrl = "/user";
const userService = {
  fetchUserInfo: () => {
    const requestUrl = `${baseUrl}/profile`;
    return axiosClient.get(requestUrl);
  },
  updateBiographyInUserProfile: (data) => {
    const requestUrl = `${baseUrl}/profile`;
    return axiosClient.put(requestUrl, data, {
      headers: {
        [headers.CONTENT_TYPE]: headers.APPLICATION_FORM_URLENCODED_VALUE,
      },
    });
  },
  getStudentsNotEnrolledInTopic: () => {
    const requestUrl = `${baseUrl}/student`;
    return axiosClient.get(requestUrl);
  },
  fetchLecturesByMajor: (majorCode) => {
    const requestUrl = `${baseUrl}/lecture?majorCode=${majorCode}`;
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
};

export default userService;
