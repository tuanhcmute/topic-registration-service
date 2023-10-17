import axiosClient from "./axiosClient";

const baseUrl = "/user";
const userService = {
  fetchUserInfo: () => {
    console.log(axiosClient);
    const requestUrl = `${baseUrl}/profile`;
    return axiosClient.get(requestUrl);
  },
};

export default userService;
