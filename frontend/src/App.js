import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import Calendar from "./Calendar/Calendar";
import Login from "./Login/Login";
import { AuthContext } from "./contexts/AuthContext";

const { useState } = require("react");

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
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ user, setUser }}>
        <Router>
          <Switch>
            <PrivateRoute path="/calendar">
              <Calendar />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/" exact>
              <Login />
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
