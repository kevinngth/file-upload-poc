import { BACKEND_URL } from "../config";

const uploadFiles = (body) => {
  return fetch(`${BACKEND_URL}uploadfiles`, {
    method: "POST",
    body,
  });
};

export default uploadFiles;
