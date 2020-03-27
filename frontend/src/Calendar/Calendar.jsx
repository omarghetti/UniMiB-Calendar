import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";

const style = {
  background: "#93253E"
};

export class Calendar extends React.Component {
  render() {
    console.log(this.props);

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
                <Avatar
                  alt={this.props.history.location.state.name}
                  src={this.props.history.location.state.imgUrl}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">
                  {this.props.history.location.state.name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}
