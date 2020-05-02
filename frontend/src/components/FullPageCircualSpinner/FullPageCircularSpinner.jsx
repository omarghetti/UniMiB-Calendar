import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  }
}));

function FullPageCircularSpinner() {
  const classes = useStyles();

  return (
    <Box
      className={classes.root}
      display="flex"
      alignItems="center"
      justifyContent="center"
      m={1}
      p={1}
    >
      <CircularProgress color="primary" />
    </Box>
  );
}
export default FullPageCircularSpinner;
