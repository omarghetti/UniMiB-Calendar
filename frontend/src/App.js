import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import theme from "./themes/theme";
import axios from "axios";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import Calendar from "./components/Calendar/Calendar";
import EventDetail from "./components/EventDetail/EventDetail";
import ErrorDisplayer from "./components/ErrorDisplayer/ErrorDisplayer";
import Login from "./components/Login/Login";
import { AuthContext } from "./contexts/AuthContext";

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
        console.info("fetching");
        const response = await axios.get("/user");
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
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  return !isReady ? (
    <div>Loading...</div>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <AuthContext.Provider value={{ user, setUser }}>
          <Router>
            <Switch>
              <Route path="/login" exact>
                <Login />
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
