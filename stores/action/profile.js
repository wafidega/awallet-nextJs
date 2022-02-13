import axios from "utils/axios";

export const GetUserById = (id) => {
  return {
    type: "GET_USER",
    payload: axios.get(`/user/profile/${id}`),
  };
};

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

export const ConfirmPin = (allPin) => {
  return {
    type: "Check_Pin",
    payload: axios.get(`/user/pin?pin=${allPin}`),
  };
};

export const UpdateDataProfile = (id, form) => {
  return {
    type: "UPDATE_PROFILE",
    payload: axios.patch(`/user/profile/${id}`, form),
  };
};
