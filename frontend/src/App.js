import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import theme from "./themes/theme";
import axios from "axios";

function App() {
  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get(`/user`);
        console.info("logged", response.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetch();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {/*        <AuthContext.Provider value={{ user, setUser }}>
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
        </AuthContext.Provider>*/}
      </div>
    </ThemeProvider>
  );
}

export default App;
