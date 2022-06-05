import axios from "utils/axios";

export const GetUserById = (id) => {
  return {
    type: "GET_USER",
    payload: axios.get(`/user/profile/${id}`),
  };
};

export const Transfer = (data) => {
  return {
    type: "GET_USER",
    payload: axios.post(`transaction/transfer`, data),
  };
};
