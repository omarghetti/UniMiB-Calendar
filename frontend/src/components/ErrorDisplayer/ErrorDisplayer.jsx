import Typography from "@material-ui/core/Typography";
import React from "react";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";

function ErrorDisplayer() {
  let { errorCode } = useParams();
  return (
    <Container>
      <Typography variant="h2" align="center">
        Error {errorCode}
      </Typography>
    </Container>
  );
}

export default ErrorDisplayer;
