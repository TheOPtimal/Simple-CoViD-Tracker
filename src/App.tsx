import React, { useState } from "react";
import { default as axios } from "axios";
import * as Papa from "papaparse";

function getStat() {
  return new Promise((resolve) => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://coronavirusapi.com/getTimeSeries/ny",
        {
          responseType: "text",
        }
      )
      .then((data) => {
        const parsedData = Papa.parse(data.data);
        resolve(parsedData.data as string[]);
      });
  });
}

function App() {
  const [tested, setTested] = useState(0);
  const [positive, setPositive] = useState(0);
  const [deaths, setDeaths] = useState(0);
  setStat();
  setInterval(setStat, 15000);
  return (
    <div className="container">
      <span className="tested">
        <span className="tested-text">Tested:</span>
        <span className="tested-number">{tested}</span>
      </span>
      <span className="positive">
        <span className="positive-text">Positive:</span>
        <span className="positive-number">{positive}</span>
      </span>
      <span className="deaths">
        <span className="deaths-text">Deaths:</span>
        <span className="positive-number">{deaths}</span>
      </span>
      <footer>
        This is stats for New York City, not the entire world. Stay home, wash
        your hands and practice social distancing.
      </footer>
    </div>
  );

  function setStat() {
    getStat().then((data) => {
      const latestData = ((data as unknown) as string[])[
        (data as string[]).length - 1
      ];
      setTested(parseInt(latestData[1]));
      setPositive(parseInt(latestData[2]));
      setDeaths(parseInt(latestData[3]));
    });
  }
}

export default App;
