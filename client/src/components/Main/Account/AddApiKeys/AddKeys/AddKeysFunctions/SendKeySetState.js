const SendKeySetState = (res, setState) => {
  if (res.status === 401) {
    // handle errors
    return setState({
      exchange: "",
      identifier: "",
      net: "",
      key: "",
      secret: "",
      error: res.message,
      isError: true,
    });
  } else if (res.status === 200) {
    return setState({
      exchange: "",
      identifier: "",
      net: "",
      key: "",
      secret: "",
      error: res.data.msg,
      isError: true,
      newExchangeAccount: true,
    });
  }
};

export default SendKeySetState;
