import { BACKEND_URL } from "../config";

const uploadFiles = (body) => {
  return fetch(`${BACKEND_URL}uploadfiles`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body,
  });
};

export default uploadFiles;
