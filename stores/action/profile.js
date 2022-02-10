import axios from "utils/axios";

export const ChangePassword = (id, data) => {
  return {
    type: "CHANGE_PASSWORD",
    payload: axios.patch(`/user/password/${id}`, data),
  };
};

export const UpdatePhoneNumber = (id, data) => {
  return {
    type: "UPDATE_PHONE",
    payload: axios.patch(`/user/profile/${id}`, data),
  };
};
