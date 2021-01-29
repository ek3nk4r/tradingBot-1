import React from "react";
// import GoogleButton from "react-google-button";
// import GoogleLogin from "react-google-login";
// import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const GoogleButtonSignUp = (props) => {
  return (
    <div>
      <Button>
        {/* <a href={`/api/auth/google`}>Sign in with Google</a> */}
        <a href={`${process.env.REACT_APP_API_URL || ""}/google/auth/google`}>
          Sign in with Google
        </a>
      </Button>
    </div>
  );
};

export default GoogleButtonSignUp;
