import React from "react";
import GoogleLogin from "react-google-login";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";

const style = {
  background: "#ba0737"
};

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      name: "",
      imgUrl: "",
      redirect: false,
      isOpenModal: false
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
        redirect: true,
        isOpenModal: false
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
      this.setState({
        isLogged: false,
        name: response.name,
        imgUrl: response.imgUrl,
        redirect: false,
        isOpenModal: true
      });
      return (
        <Modal
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          open={this.state.isOpenModal}
        >
          <div>
            <h2 id="simple-modal-title">Errore!</h2>
            <p id="simple-modal-description">Riprova ad effettuare il Login</p>
          </div>
        </Modal>
      );
    };
    return (
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

            <Grid item>
              <GoogleLogin
                clientId="645362289460-ulika5v4o1a96cpfibbv7q73vfoihnr2.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}