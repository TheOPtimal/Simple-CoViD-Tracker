import React, { useState, useEffect, useRef } from "react";
import { default as axios } from "axios";
import * as Papa from "papaparse";
import Loading from "./Loading";

function useInterval(callback: () => any, delay: number) {
  const savedCallback = useRef(callback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function getStat(setModalVisibility: any) {
  return new Promise((resolve) => {
    axios
      .get(
        "ttps://cors.bridged.cc/https://coronavirusapi.com/getTimeSeries/ny",
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
        setModalVisibility(true);
      });
  });
}

function InfoPart({
  text,
  num,
  utctime = false,
  themeColor,
  textColor,
}: {
  text: string;
  num: any;
  utctime?: boolean;
  themeColor: string;
  textColor: string;
}) {
  if (utctime) {
    const date = new Date(num * 1000);
    num = date.toLocaleString();
  }
  return (
    <span className="info-container">
      <span className="info-text" style={{ color: themeColor }}>
        {text}
      </span>
      <span className="info-number" style={{ color: textColor }}>
        {num}
      </span>
    </span>
  );
}

function App() {
  const [tested, setTested] = useState(0);
  const [positive, setPositive] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [time, setTime] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [bgColor, setBgColor] = useState<"white" | "#1a1a1a">("white");
  const [textColor, setTextColor] = useState<"white" | "black">("black");
  const [themeColor, setThemeColor] = useState<
    "rgb(0, 153, 153)" | "rgb(0, 200, 200)"
  >("rgb(0, 153, 153)");
  type theme = "light" | "dark";
  const [themeMode, setThemeMode] = useState<theme>(
    (localStorage.getItem("theme") as theme) || "light"
  );

  useEffect(() => {
    DarkLoad();
    setStat();
  });
  useInterval(setStat, 40000);

  function DarkLoad() {
    if (themeMode === "dark") {
      setThemeMode("dark");
      setThemeColor("rgb(0, 200, 200)");
      setTextColor("white");
      setBgColor("#1a1a1a");
      localStorage.setItem("theme", "dark");
    }
  }

  function DarkModeToggle() {
    return (
      <div
        className="darkModeButtonContainer"
        data-testid="darkmode-button"
        onClick={() => {
          if (themeMode === "light") {
            setThemeMode("dark");
            setThemeColor("rgb(0, 200, 200)");
            setTextColor("white");
            setBgColor("#1a1a1a");
            localStorage.setItem("theme", "dark");
          } else if (themeMode === "dark") {
            setThemeMode("light");
            setThemeColor("rgb(0, 153, 153)");
            setTextColor("black");
            setBgColor("white");
            localStorage.setItem("theme", "light");
          }
        }}
      >
        <i className="gg-dark-mode"></i>
      </div>
    );
  }

  function setStat() {
    getStat(setModalVisibility).then((data) => {
      const latestData = ((data as unknown) as string[])[
        (data as string[]).length - 1
      ];
      setTime(parseInt(latestData[0]));
      setTested(parseInt(latestData[1]));
      setPositive(parseInt(latestData[2]));
      setDeaths(parseInt(latestData[3]));
    });
  }
  return (
    <div className="container" style={{ backgroundColor: bgColor }}>
      <DarkModeToggle />
      <div className="if-part-container">
        <InfoPart
          text="Time recorded:"
          num={time}
          utctime={true}
          themeColor={themeColor}
          textColor={textColor}
        />
        <InfoPart
          text="Tested:"
          num={tested}
          themeColor={themeColor}
          textColor={textColor}
        />
        <InfoPart
          text="Positive:"
          num={positive}
          themeColor={themeColor}
          textColor={textColor}
        />
        <InfoPart
          text="Deaths:"
          num={deaths}
          themeColor={themeColor}
          textColor={textColor}
        />
      </div>
      <footer style={{ color: textColor }}>
        This is stats for New York City, not the entire world. Stay home, wash
        your hands and practice social distancing.
      </footer>
      <Loading
        visibility={modalVisibility}
        setModalVisibility={setModalVisibility}
      />
    </div>
  );
}

export default App;
