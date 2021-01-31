import React from "react";
// import GoogleTypography from "react-google-Typography";
// import GoogleLogin from "react-google-login";
// import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const GoogleButtonSignUp = (props) => {
  return (
    <div>
      <Typography
        style={{
          textDecoration: "none",
          color: "#5b9ca0",
          marginTop: "5px",
          marginBottom: "20px",
        }}
      >
        {/* <a href={`/api/auth/google`}>Sign in with Google</a> */}
        <Link
          style={{
            textDecoration: "none",
            width: "30vw",
            height: "25px",
            marginTop: "5px",
            marginBottom: "10px",
            color: "#5b9ca0",
          }}
          href={`${process.env.REACT_APP_API_URL || ""}/google/auth/google`}
        >
          Sign in with Google
        </Link>
      </Typography>
    </div>
  );
};

export default GoogleButtonSignUp;
