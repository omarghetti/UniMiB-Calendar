import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./Login/index";
import { Calendar } from "./Calendar/index";

function App() {
  return (
    <Fragment>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/calendar" component={Calendar} />
            <Route path="/login" component={Login} />
            <Route path="/" exact component={Login} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
