import React, { useContext } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import { AuthContext } from "../../contexts/AuthContext";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { GoogleLogout } from "react-google-login";
import { useHistory, useLocation } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary,
    zIndex: 99
  },
  title: {
    flexGrow: 1
  },
  offset: theme.mixins.toolbar
}));

function TopBar() {
  let location = useLocation();
  let history = useHistory();
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

    history.push({
      pathname: "/",
      state: { from: location }
    });
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.root}>
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
              {user.avatar ? (
                <Avatar src={user.avatar} alt={user.name} />
              ) : (
                <div />
              )}
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
      <div className={classes.offset} />
    </React.Fragment>
  );
}

export default TopBar;
