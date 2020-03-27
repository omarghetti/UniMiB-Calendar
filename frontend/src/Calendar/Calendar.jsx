import React, { useContext } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import { AuthContext } from "../contexts/AuthContext";

const style = {
  background: "#93253E"
};

function Calendar(props) {
  let { user } = useContext(AuthContext);

  return (
    <AppBar position="static" style={style}>
      <Toolbar>
        <Grid justify="space-between" container>
          <Grid item xs={10}>
            <Typography variant="h6">UniMiBCalendar</Typography>
          </Grid>
          <Grid item container spacing={1} xs={2}>
            <Grid item xs={2}>
              <p>
                <span />
              </p>
            </Grid>
            <Grid item xs={2}>
              <p>
                <span />
              </p>
            </Grid>
            <Grid item xs={2}>
              <Avatar alt={user.name} src={user.avatar} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">{user.name}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Calendar;
