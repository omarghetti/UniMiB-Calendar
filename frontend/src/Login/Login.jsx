import React from "react";
import GoogleLogin from "react-google-login";
import Grid from "@material-ui/core/Grid";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      name: "",
      imgUrl: "",
      redirect: false
    };
  }

  render() {
    const { redirect } = this.state;
    const responseGoogleSuccess = response => {
      console.log(response);
      this.setState({
        isLogged: true,
        name: response.profileObj.name,
        imgUrl: response.profileObj.imageUrl,
        redirect: true
      });
      if (redirect) {
        console.log("redirected!");
        this.props.history.push({
          pathname: "/calendar",
          state: {
            name: this.state.name,
            imgUrl: this.state.imgUrl
          }
        });
      }
    };
    const responseGoogleFailure = response => {
      console.log(response);
    };
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <div align="center">
          <h1>Accedi con il tuo Account di Ateneo</h1>
          <GoogleLogin
            clientId="645362289460-ulika5v4o1a96cpfibbv7q73vfoihnr2.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
        </div>
      </Grid>
    );
  }
}
