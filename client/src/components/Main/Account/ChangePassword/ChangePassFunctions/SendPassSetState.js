const SendPassSetState = (res, setState, history) => {
  if (res.status === 401) {
    // handle errors
    setState({
      error: res.message,
      isError: true,
    });
  } else if (res.status === 200) {
    history.push("/home");
  }
};

export default SendPassSetState;
