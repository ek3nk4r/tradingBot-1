// material-ui
import { makeStyles } from "@material-ui/core/styles";

const UseStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  container: {
    maxHeight: "35vh",
    maxWidth: "65vw",
    border: "1px solid #c4c4c4",
    borderRadius: "4px",
  },
}));

export default UseStyles;
