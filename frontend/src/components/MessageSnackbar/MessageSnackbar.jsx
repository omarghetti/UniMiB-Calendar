import Snackbar from "@material-ui/core/Snackbar";
import * as React from "react";
import Alert from "@material-ui/lab/Alert";

export default function MessageSnackbar(props) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={props.open}
        onClose={props.handleClose}
        autoHideDuration={3000}
      >
        <Alert>{props.message}</Alert>
      </Snackbar>
    </div>
  );
}
