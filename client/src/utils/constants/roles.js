export const ROLE_ANONYMOUS = "ROLE_ANONYMOUS";
export const ROLE_STUDENT = "ROLE_STUDENT";
export const ROLE_LECTURE = "ROLE_LECTURE";
export const ROLE_HEAD = "ROLE_HEAD";
export const ROLE_ADMIN = "ROLE_ADMIN";

export const roleCode = {
  [ROLE_ANONYMOUS]: {
    value: ROLE_ANONYMOUS,
    label: "Khách",
  },
  [ROLE_STUDENT]: {
    value: ROLE_STUDENT,
    label: "Sinh viên",
  },
  [ROLE_LECTURE]: {
    value: ROLE_LECTURE,
    label: "Giảng viên",
  },
  [ROLE_HEAD]: {
    value: ROLE_HEAD,
    label: "Trưởng bộ môn",
  },
  [ROLE_ADMIN]: {
    value: ROLE_ADMIN,
    label: "Admin",
  },
  ROLE_ALL: {
    value: "ROLE_ALL",
    label: "Tất cả",
  },
};
