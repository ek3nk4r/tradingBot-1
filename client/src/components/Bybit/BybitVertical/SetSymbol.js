const SetSymbol = (newValue, symbol, innerHTML, setState) => {
  if (innerHTML !== symbol) {
    return setState({
      value: newValue,
      symbol: innerHTML,
    });
  } else {
    return null;
  }
};

export default SetSymbol;
