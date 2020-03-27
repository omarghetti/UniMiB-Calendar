import React, { Fragment, useContext } from "react";
import GoogleLogin from "react-google-login";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const style = {
  background: "#93253E"
};

const divStyle = {
  position: "fixed",
  textAlign: "center",
  top: "35%",
  left: "35%"
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
          <Grid
            justify="space-between" // Add it here :)
            container
            spacing={24}
          >
            <Grid item>
              <Typography variant="h6">UniMiBCalendar</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div style={divStyle}>
        <h1>Accedi Con il Tuo Account di Ateneo</h1>
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
