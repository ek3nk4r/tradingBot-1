import axios from "axios";

const sendPass = (id, currentPassword, newPassword) => {
  console.log("NEW PASS AXIOS:", newPassword);
  return axios
    .post("/passChange/passwordChange", {
      id: id,
      newPassword: newPassword,
      currentPassword: currentPassword,
    })
    .then((response) => {
      console.log("NP AXIOS RESPONSE:", response);
      return response;
    })
    .catch((err) => {
      console.log("err", err);
      return err.response.data;
    });
};

export { sendPass };
