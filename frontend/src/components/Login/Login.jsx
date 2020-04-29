import React, { Fragment, useEffect } from "react";
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
  let { user } = React.useContext(AuthContext);

  useEffect(() => {
    if (user.isAuthenticated) {
      history.push({
        pathname: "/calendar",
        state: { from: location }
      });
    }
  }, [history, location, user]);

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
            <a href={"/auth/google"}>Login</a>
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
