const SendKeySetState = (res, setState) => {
  if (res.status === 401) {
    // handle errors
    return setState({
      exchange: "",
      identifier: "",
      net: "",
      key: "",
      secret: "",
    });
  } else if (res.status === 200) {
    return setState({
      exchange: "",
      identifier: "",
      net: "",
      key: "",
      secret: "",
      newExchangeAccount: true,
    });
  }
};

export default SendKeySetState;
