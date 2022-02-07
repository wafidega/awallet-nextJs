import axios from "utils/axios";

export const LoginUser = (form) => {
  return { type: "LOGIN", payload: axios.post("/auth/login", form) };
};

export const RegisterUser = (form) => {
  return { type: "REGISTER", payload: axios.post("/auth/register", form) };
};

export const PinUser = (id, data) => {
  return { type: "CREATE_PIN", payload: axios.patch(`/user/pin/${id}`, data) };
};
