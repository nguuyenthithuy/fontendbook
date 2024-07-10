import axios from "../utils/axios-customize";

export const callRegister = (fullName, email, password, phone) => {
  return axios.post("/api/v1/user/register", {
    fullName,
    email,
    password,
    phone,
  });
};
export const callLogin = (username, password) => {
  return axios.post("/api/v1/auth/login", {
    username,
    password,
  });
};
export const callFetchAccount = () => {
  return axios.get("/api/v1/auth/account");
};
export const callLogOut = () => {
  return axios.post("/api/v1/auth/logout");
};
export const callListUser = (query) => {
  return axios.get(`/api/v1/user?${query}`);
};
export const callCreateAUser = (fullName, password, email, phone) => {
  return axios.post("/api/v1/user", {
    fullName,
    password,
    email,
    phone,
  });
};
export const callUpdateUser = (_id, fullName, phone) => {
  return axios.put("/api/v1/user", {
    _id,
    fullName,
    phone,
  });
};

//  api book
export const callListBook = (query) => {
  return axios.get(`/api/v1/book?${query}`);
};
export const callCategoryBook = () => {
  return axios.get(`/api/v1/database/category`);
};
export const callUploadBookImg = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: `/api/v1/file/upload`,
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "book",
    },
  });
};
export const callCreateABook = (
  thumbnail,
  slider,
  mainText,
  author,
  price,
  category,
  quantity,
  sold
) => {
  return axios.post("/api/v1/book", {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    category,
    quantity,
    sold,
  });
};
export const callUpdateBook = (
  _id,
  thumbnail,
  slider,
  mainText,
  author,
  price,
  category,
  quantity,
  sold
) => {
  return axios.put(`/api/v1/book/${_id}`, {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    category,
    quantity,
    sold,
  });
};
export const callDeleteBook = (_id) => {
  return axios.delete(`/api/v1/book/${_id}`);
};
