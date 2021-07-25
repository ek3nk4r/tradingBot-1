const SendLoginSetState = (data, setState, setUser, history) => {
  if (data.message) {
    // handle errors
    setState({
      username: "",
      password: "",
      error: data.message,
      isError: true,
    });
  } else {
    // no error
    // lift the data up to the App state
    setUser(data);
    // redirect to "/home"
    history.push("/home");
  }
};

export default SendLoginSetState;
