import axios from "axios";

const sendPass = (id, currentPassword, newPassword) => {
  return axios
    .post("/passChange/passwordChange", {
      id: id,
      newPassword: newPassword,
      currentPassword: currentPassword,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export { sendPass };
