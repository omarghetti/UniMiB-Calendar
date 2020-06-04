import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import theme from "./themes/theme";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import Calendar from "./components/Calendar/Calendar";
import EventDetail from "./components/EventDetail/EventDetail";
import ErrorDisplayer from "./components/ErrorDisplayer/ErrorDisplayer";
import { AuthContext } from "./contexts/AuthContext";
import FullPageCircularSpinner from "./components/FullPageCircualSpinner/FullPageCircularSpinner";
import axios from "axios";
import EventEditor from "./components/EventEditor/EventEditor";
import TopBar from "./components/TopBar/TopBar";
import MessageSnackbar from "./components/MessageSnackbar/MessageSnackbar";
import { MessageContext } from "./contexts/MessageContext";

function App() {
  const [user, setUser] = useState({
    isAuthenticated: false,
    name: "",
    avatar: ""
  });

  const [message, setMessage] = useState({
    open: false,
    text: "",
    severity: "info"
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axios.get("/api/user");
        const user = response.data;
        if (user.token) {
          setUser({
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            isLoggedIn: true
          });
        }
      } catch (err) {
        console.error(err);
      }
    }

    checkAuth().then(() => setIsReady(true));
  }, []);

  return !isReady ? (
    <ThemeProvider theme={theme}>
      <FullPageCircularSpinner />
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <AuthContext.Provider value={{ user, setUser }}>
          <MessageContext.Provider value={{ message, setMessage }}>
            <Router>
              <TopBar />
              <MessageSnackbar
                open={message.open}
                message={message.text}
                severity={message.severity}
                handleClose={() => setMessage({ open: false, text: "" })}
              />
              <Switch>
                <Route path="/" exact>
                  <Redirect
                    to={{
                      pathname: "/calendar"
                    }}
                  />
                </Route>
                <Route path="/_=_" exact>
                  <Redirect
                    to={{
                      pathname: "/calendar"
                    }}
                  />
                </Route>
                <Route path="/calendar" exact>
                  <Calendar />
                </Route>
                <Route path="/calendar/:eventId">
                  <EventDetail />
                </Route>
                <Route path="/new" exact>
                  <EventEditor />
                </Route>
                <Route path="/error/:errorCode" exact>
                  <ErrorDisplayer />
                </Route>
              </Switch>
            </Router>
          </MessageContext.Provider>
        </AuthContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
