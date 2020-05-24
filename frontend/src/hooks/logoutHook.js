import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory, useLocation } from "react-router-dom";

export default function useLogout() {
  let location = useLocation();
  let history = useHistory();
  const [logout, setLogout] = useState(false);
  const { setUser } = React.useContext(AuthContext);

  useEffect(() => {
    async function doLogout() {
      try {
        await axios.get("/api/logout");
        setUser({ isLoggedIn: false });
        history.push({
          pathname: (window.location.href = "/api/login"),
          state: { from: location }
        });
      } catch (err) {
        console.error(err);
      }
    }

    if (logout) {
      doLogout();
    }
  }, [logout, history, location, setUser]);

  return setLogout;
}
