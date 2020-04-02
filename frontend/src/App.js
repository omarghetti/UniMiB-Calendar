import React, { useState } from "react";
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

function App() {
  const [user, setUser] = useState({
    isAuthenticated: false,
    name: "",
    avatar: ""
  });

  function PrivateRoute({ children, ...rest }) {
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
          <TopBar />
          <Router>
            <Switch>
              <PrivateRoute path="/calendar">
                <Calendar />
              </PrivateRoute>
              <Route path="/" exact>
                <Login />
              </Route>
            </Switch>
          </Router>
        </AuthContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
