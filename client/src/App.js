import React from "react";
import Bybit from "./components/Bybit/Bybit";
// import Kraken from "./components/Kraken";

class App extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Bybit></Bybit>
        {/* <Kraken></Kraken> */}
      </div>
    );
  }
}

export default App;
