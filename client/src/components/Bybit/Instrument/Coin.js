const Coin = (symbol) => {
  let coin;
  if (symbol.charAt(symbol.length - 1) === "T") {
    coin = symbol.slice(symbol.indexOf("/") + 1, symbol.length);
  } else if (symbol.charAt(symbol.length - 1) === "D") {
    coin = symbol.slice(0, symbol.indexOf("/"));
  } else {
    coin = symbol;
  }

  return coin;
};

export default Coin;
