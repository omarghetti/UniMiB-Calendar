import { createMuiTheme } from "@material-ui/core";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#a71e3b",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#0F625A",
      contrastText: "#ffffff"
    }
  },
  status: {
    success: green,
    danger: {
      main: "#F4511E",
      contrastText: "#fff"
    }
  },
  offsets: {
    toolbar: 64
  }
});

export default theme;
