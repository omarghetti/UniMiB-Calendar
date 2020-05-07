import React, { Fragment, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "@material-ui/core/Button";
import { ReactComponent as IcoGoogleLogin } from "../../assets/svg/google-logo.svg";
import { ReactComponent as IconFacebook } from "../../assets/svg/icons8-facebook.svg";
import { ReactComponent as IconTwitter } from "../../assets/svg/icons8-twitter.svg";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    marginTop: "128px",
    padding: "16px"
  },
  googleIcon: {
    height: "16px"
  },
  facebookIcon: {
    height: "24px"
  },
  twitterIcon: {
    height: "24px"
  },
  googleLoginButton: {
    backgroundColor: "#fff"
  },
  fbLoginButton: {
    backgroundColor: "#fff"
  },
  twLoginButton: {
    backgroundColor: "#fff"
  }
}));

function Login() {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [loginWith, setLoginWith] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUser } = React.useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      history.push({
        pathname: "/calendar",
        state: { from: location }
      });
    }
  }, [isLoggedIn, history, location]);

  useEffect(() => {
    async function doLogin() {
      try {
        const response = await axios.get(`/api/auth/${loginWith}`);
        const user = response.data;
        if (user.token) {
          setUser({ email: user.email, name: user.name, isLoggedIn: true });
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (loginWith) {
      doLogin();
    }
  }, [loginWith, setUser]);

  return (
    <div className={classes.root}>
      <Fragment>
        <Typography variant="h4">Benvenuto, effettua il login.</Typography>
        <br />

        <Button
          variant="contained"
          className={classes.googleLoginButton}
          startIcon={<IcoGoogleLogin className={classes.googleIcon} />}
          onClick={() => setLoginWith("google")}
        >
          Login con Google
        </Button>

        <br />
        <br />

        <Button
          variant="contained"
          className={classes.fbLoginButton}
          startIcon={<IconFacebook className={classes.facebookIcon} />}
          onClick={() => setLoginWith("facebook")}
        >
          Login con Facebook
        </Button>

        <br />
        <br />

        <Button
          variant="contained"
          className={classes.twLoginButton}
          startIcon={<IconTwitter className={classes.twitterIcon} />}
          onClick={() => setLoginWith("twitter")}
        >
          Login con Twitter
        </Button>

        <br />
        <br />

        <Button
          variant="contained"
          color="secondary"
          onClick={() => setLoginWith("mock")}
        >
          Fake login
        </Button>
      </Fragment>
    </div>
  );
}

export default Login;
