// material-ui
import { makeStyles } from "@material-ui/core/styles";

const LoginUseStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(0),
      width: "25ch",
      justifyContent: "center",
    },
  },
}));

const SignupUseStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(0),
      width: "25ch",
    },
  },
}));

export { LoginUseStyles, SignupUseStyles };
