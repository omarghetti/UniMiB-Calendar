import React, { Fragment, useEffect } from "react";
import GoogleLogin from "react-google-login";
import Typography from "@material-ui/core/Typography";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const divStyle = {
  textAlign: "center",
  marginTop: "128px",
  padding: "16px"
};

function Login() {
  let history = useHistory();
  let location = useLocation();
  let { user, setUser } = React.useContext(AuthContext);

  useEffect(() => {
    if (user.isAuthenticated) {
      history.push({
        pathname: "/calendar",
        state: { from: location }
      });
    }
  }, [history, location, user]);

  const responseGoogleSuccess = response => {
    console.info("Authentication successful.");
    setUser({
      isAuthenticated: true,
      name: response.profileObj.name,
      email: response.profileObj.email,
      avatar: response.profileObj.imageUrl,
      tokenId: response.tokenId
    });

    if (process.env.NODE_ENV === "development")
      console.info("Token id: ", response.tokenId);

    history.push({
      pathname: "/calendar",
      state: { from: location }
    });
  };

  const responseGoogleFailure = response => {
    console.error("Authentication failed.");

    setUser({
      isAuthenticated: false,
      name: "",
      avatar: ""
    });
  };

  return (
    <Fragment>
      {user.isAuthenticated ? (
        <div style={divStyle}>
          <Typography variant="h4">
            Sei già loggato, effettua il logout se vuoi cambiare account.
          </Typography>
        </div>
      ) : (
        <div style={divStyle}>
          <Typography variant="h4">
            Accedi con il tuo account di Ateneo.
          </Typography>
          <br />
          <div>
            <GoogleLogin
              clientId="645362289460-ulika5v4o1a96cpfibbv7q73vfoihnr2.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
              className={"login-button"}
              uxMode={"redirect"}
            />
            <div className={"spinner-wrapper"}>
              <svg
                className="spinner"
                width="65px"
                height="65px"
                viewBox="0 0 66 66"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="path"
                  fill="none"
                  strokeWidth="6"
                  strokeLinecap="round"
                  cx="33"
                  cy="33"
                  r="30"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Login;
