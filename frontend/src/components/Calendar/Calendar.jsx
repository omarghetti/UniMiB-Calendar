import React, { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import { AuthContext } from "../../contexts/AuthContext";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PersonIcon from "@material-ui/icons/Person";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory, useLocation } from "react-router-dom";

const style = {
  background: "#93253E"
};

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1
  }
}));

function Calendar() {
  let history = useHistory();
  let location = useLocation();
  const classes = useStyles();
  let { user, setUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    setUser({
      isAuthenticated: false,
      name: "",
      avatar: ""
    });
    console.log("redirected!");

    history.push({
      pathname: "/login",
      state: { from: location }
    });
  };

  return (
    <AppBar position="static" style={style}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          UniMiBCalendar
        </Typography>
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar src={user.avatar} alt={user.name} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem dense onClick={handleClose}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Profilo" />
            </MenuItem>
            <MenuItem dense onClick={handleClose}>
              <GoogleLogout
                clientId="645362289460-ulika5v4o1a96cpfibbv7q73vfoihnr2.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={Logout}
              />
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Calendar;
