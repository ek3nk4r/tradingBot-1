import React from "react";
import { Link } from "react-router-dom";

const NoAccount = () => {
  return (
    <>
      <div>
        <div>
          Don't have account?
          <Link
            to={"/signup"}
            style={{
              textDecoration: "none",
              color: "#7D237C",
            }}
          >
            {" "}
            Signup
          </Link>
        </div>
      </div>
    </>
  );
};

export default NoAccount;
