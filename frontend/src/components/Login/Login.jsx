import React, { Fragment, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const divStyle = {
  textAlign: "center",
  marginTop: "128px",
  padding: "16px"
};

function Login() {
  const history = useHistory();
  const location = useLocation();
  const [login, setLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUser } = React.useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      setUser({ isLoggedIn: true });

      history.push({
        pathname: "/calendar",
        state: { from: location }
      });
    }
  }, [isLoggedIn, history, location, setUser]);

  useEffect(() => {
    async function doLogin() {
      try {
        const response = await axios.get("/auth/mock");
        if (response.data.token) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (login) {
      doLogin();
    }
  }, [login]);

  return (
    <Fragment>
      <div style={divStyle}>
        <Typography variant="h4">
          Accedi con il tuo account di Ateneo.
        </Typography>
        <button onClick={() => setLogin(true)}>Login</button>
      </div>
    </Fragment>
  );
}

export default Login;
