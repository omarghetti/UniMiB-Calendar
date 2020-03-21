import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./Login/index";
import { Calendar } from "./Calendar/index";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/calendar" component={Calendar} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
