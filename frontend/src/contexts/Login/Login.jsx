import React, { Fragment, useContext } from "react";
import GoogleLogin from "react-google-login";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const style = {
  background: "#93253E"
};

const divStyle = {
  textAlign: "center",
  marginTop: "256px",
  padding: "16px"
};

function Login() {
  let history = useHistory();
  let location = useLocation();
  let { setUser } = useContext(AuthContext);

  const responseGoogleSuccess = response => {
    setUser({
      isAuthenticated: true,
      name: response.profileObj.name,
      avatar: response.profileObj.imageUrl
    });

    console.log("redirected!");

    history.push({
      pathname: "/calendar",
      state: { from: location }
    });
  };

  const responseGoogleFailure = response => {
    setUser({
      isAuthenticated: false,
      name: "",
      avatar: "",
      failed: true
    });
  };

  return (
    <Fragment>
      <AppBar position="static" style={style}>
        <Toolbar>
          <Typography variant="h6">UniMiBCalendar</Typography>
        </Toolbar>
      </AppBar>
      <div style={divStyle}>
        <Typography variant="h4">
          Accedi con il tuo account di Ateneo.
        </Typography>
        <br />
        <GoogleLogin
          clientId="645362289460-ulika5v4o1a96cpfibbv7q73vfoihnr2.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogleFailure}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </Fragment>
  );
}

export default Login;
