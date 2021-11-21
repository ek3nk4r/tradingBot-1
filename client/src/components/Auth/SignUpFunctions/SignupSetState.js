const SignupSetState = (res, setState, setUser, history) => {
  if (res.message) {
    // handle errors
    setState({
      error: res.message,
      isError: true,
    });
  } else {
    console.log("no error", res);
    // no error
    // lift the res up to the App state
    setUser(res);
    history.push("/");
  }
};

export default SignupSetState;
