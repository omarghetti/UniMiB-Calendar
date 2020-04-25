import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import Calendar from "./components/Calendar/Calendar";
import Login from "./components/Login/Login";
import { AuthContext } from "./contexts/AuthContext";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import theme from "./themes/theme";
import TopBar from "./components/TopBar/TopBar";
import EventDetail from "./components/EventDetail/EventDetail";
import ErrorDisplayer from "./components/ErrorDisplayer/ErrorDisplayer";
import axios from "axios";

function App() {
  const initialState = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {
        isAuthenticated: false,
        name: "",
        avatar: ""
      };
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(user));
    axios.defaults.headers.common["Authorization"] = user.tokenId;
  }, [user]);

  function PrivateRoute({ children, ...rest }) {
    axios.defaults.headers.common["Authorization"] = user.tokenId;

    return (
      <Route
        {...rest}
        render={({ location }) =>
          user.isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <AuthContext.Provider value={{ user, setUser }}>
          <Router>
            <TopBar />
            <Switch>
              <PrivateRoute path="/calendar" exact>
                <Calendar />
              </PrivateRoute>
              <PrivateRoute path="/calendar/:eventId">
                <EventDetail />
              </PrivateRoute>
              <Route path="/" exact>
                <Login />
              </Route>
              <Route path="/error/:errorCode" exact>
                <ErrorDisplayer />
              </Route>
            </Switch>
          </Router>
        </AuthContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
