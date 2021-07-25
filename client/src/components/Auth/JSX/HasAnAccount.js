import React from "react";
import { Link } from "react-router-dom";

const HasAnAccount = () => {
  return (
    <>
      <div>
        Already have account?
        <Link
          to={"/login"}
          style={{
            textDecoration: "none",
            color: "#7D237C",
          }}
        >
          {" "}
          Login
        </Link>
      </div>
    </>
  );
};

export default HasAnAccount;
