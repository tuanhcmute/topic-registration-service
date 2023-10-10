import { v4 as uuid } from "uuid";

const userService = {
  fetchUserInfo: () =>
    Promise.resolve({
      id: uuid(),
      fullName: "Nguyen Tran Thi Van",
      role: "LECTURE",
    }),
};

export default userService;
