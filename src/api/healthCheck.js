import { BACKEND_URL } from "../config";

const healthCheck = () => {
  return fetch(`${BACKEND_URL}healthcheck`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
};

export default healthCheck;
