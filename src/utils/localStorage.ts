import axios from "axios";

export const addAccessTokensToLocalStorage = (
  accessToken: string,
  isLoggedIn: string,
  id: string
) => {
  localStorage.setItem("isLoggedIn", isLoggedIn);
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("id", id);
};

/**
 * Sets the defaults to the axios request
 * sets the default authorization
 * Sets the base url
 */
export const addDefaultsToAxios = () => {
  const accessToken = localStorage.getItem("accessToken");
  axios.defaults.baseURL = "https://secret-eyrie-73204.herokuapp.com/";

  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    axios.defaults.headers.common["Content-Type"] = "Application/json";
  }
};

export const clearLocalStorage = () => {
  delete axios.defaults.headers.common["Authorization"];
  localStorage.removeItem("accessToken");
  localStorage.setItem("isLoggedIn", "false");
  localStorage.removeItem("id");
};

export const isUserLoggedIn = () => {
  return JSON.parse(localStorage.getItem("isLoggedIn") as string);
};

export const getUserId = () => {
  return JSON.parse(localStorage.getItem("id") as string);
};
