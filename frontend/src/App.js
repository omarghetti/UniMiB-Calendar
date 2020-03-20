import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const result = await axios("/events");
    setData(result.data);
    console.info({ result });
  }, []);

  return (
    <div className="App">
      {data.map(item => (
        <li key={item.title}>{item.title}</li>
      ))}
    </div>
  );
}

export default App;
