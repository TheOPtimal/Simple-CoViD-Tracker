import React, { useState } from "react";
import { default as axios } from "axios";
import * as Papa from "papaparse";
import Loading from "./Loading";

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
      })
      .catch((err) => {
        console.error(
          "It looks like the hourly quota has been reached. Check back in 60 minutes or use ngrok."
        );
      });
  });
}

function InfoPart({
  text,
  num,
  utctime = false,
}: {
  text: string;
  num: any;
  utctime?: boolean;
}) {
  if (utctime) {
    const date = new Date(num * 1000);
    num = date.toLocaleString();
  }
  return (
    <span className="info-container">
      <span className="info-text">{text}</span>
      <span className="info-number">{num}</span>
    </span>
  );
}

function App() {
  const [tested, setTested] = useState(0);
  const [positive, setPositive] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [time, setTime] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(false)
  setStat();
  setInterval(setStat, 40000);
  return (
    <div className="container">
      <InfoPart text="Time recorded:" num={time} utctime={true} />
      <InfoPart text="Tested:" num={tested} />
      <InfoPart text="Positive:" num={positive} />
      <InfoPart text="Deaths:" num={deaths} />
      <footer>
        This is stats for New York City, not the entire world. Stay home, wash
        your hands and practice social distancing.
      </footer>
      <Loading visibility={modalVisibility} />
    </div>
  );

  function setStat() {
    getStat().then((data) => {
      const latestData = ((data as unknown) as string[])[
        (data as string[]).length - 1
      ];
      setTime(parseInt(latestData[0]));
      setTested(parseInt(latestData[1]));
      setPositive(parseInt(latestData[2]));
      setDeaths(parseInt(latestData[3]));
    });
  }
}

export default App;
