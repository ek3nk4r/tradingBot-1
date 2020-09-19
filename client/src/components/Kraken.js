// import React, { Component } from "react";
// import axios from "axios";

// class Kraken extends Component {
//   state = {
//     symbol: "",
//   };

//   componentDidMount = () => {
//     axios.get("/kraken/ticker").then((res) => {
//       console.log("krakenData:", res.data);
//       this.setState({ symbol: res.data.symbol });
//     });
//   };

//   render() {
//     const { symbol } = this.state;
//     return (
//       <div>
//         <div>{symbol}</div>
//       </div>
//     );
//   }
// }

// export default Kraken;
