import * as React from "react";

export const MessageContext = React.createContext({
  open: false,
  text: "",
  severity: "info"
});
