import React, { useEffect, useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory, useLocation } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [logout, setLogout] = useState(false);
  const { setUser } = React.useContext(AuthContext);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    async function doLogout() {
      try {
        const { data } = await axios.get("/logout");
        if (data.redirectUrl) {
          setUser({ isLoggedIn: false });

          history.push({
            pathname: data.redirectUrl,
            state: { from: location }
          });
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (logout) {
      doLogout();
    }
  }, [logout, history, location, setUser]);

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            UniMiBCalendar
          </Typography>
          <div>
            {
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src="/user/" alt={"U"} />
              </IconButton>
            }
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
                <button onClick={() => setLogout(true)}>Logout</button>
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
