import API from "./api";

export const loginUserApi = async ({ email, password }) => {
  const response = await API.post("/auth/login", {
    email: email.trim(),
    password,
  });
  return response.data;
};

export const registerUserApi = async ({ name, email, password }) => {
  const response = await API.post("/auth/register", {
    name,
    email: email.trim(),
    password,
  });
  return response.data;
};
