import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import theme from "./themes/theme";
import axios from "axios";
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

function App() {
  const [user, setUser] = useState({
    isAuthenticated: false,
    name: "",
    avatar: ""
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axios.get("/api/user");
        const user = response.data;
        if (user.token) {
          setUser({ email: user.email, name: user.name, isLoggedIn: true });
        }
      } catch (err) {
        console.error(err);
      }
    }

    checkAuth().then(() => setIsReady(true));
  }, []);

  function PrivateRoute({ children, ...rest }) {
    const { user } = React.useContext(AuthContext);

    console.info("context user is ", user);
    return (
      <Route
        {...rest}
        render={({ location }) =>
          user.isLoggedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/api/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  return !isReady ? (
    <ThemeProvider theme={theme}>
      <FullPageCircularSpinner />
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <AuthContext.Provider value={{ user, setUser }}>
          <Router>
            <Switch>
              <Route path="/" exact>
                <Redirect
                  to={{
                    pathname: "/calendar"
                  }}
                />
              </Route>
              <PrivateRoute path="/calendar" exact>
                <Calendar />
              </PrivateRoute>
              <Route path="/calendar/:eventId">
                <EventDetail />
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
