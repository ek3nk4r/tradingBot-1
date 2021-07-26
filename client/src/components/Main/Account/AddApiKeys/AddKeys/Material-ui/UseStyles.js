// material-ui
import { makeStyles } from "@material-ui/core/styles";

const UseStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(0),
      width: "25ch",
      justifyContent: "center",
    },
  },
}));

export default UseStyles;
