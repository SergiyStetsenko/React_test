import React from "react";
import { useEffect, useState } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import style from "./style.module.css";

export default function App() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState("stop");

  useEffect(() => {
    const range = new Subject();
    interval(1000)
      .pipe(takeUntil(range))
      .subscribe(() => {
        if (status === "run") {
          setSec((val) => val + 1000);
        }
      });

    return () => {
      range.next();
      range.complete();
    };
  }, [status]);

  const start = React.useCallback(() => {
    setStatus("run");
  }, []);

  const stop = React.useCallback(() => {
    setStatus("stop");
    setSec(0);
  }, []);

  const reset = React.useCallback(() => {
    setSec(0);
  }, []);

  const wait = React.useCallback(() => {
    setStatus("stop");
  }, []);

  const stopwatch = new Date(sec).toISOString().slice(11, 19);

  return (
    <div className={style.container}>
      <span> {stopwatch}</span>
      <div className={style.button}>
        <button className={style.start} type="button" onClick={start}>
          Start
        </button>
        <button className={style.start} type="button" onClick={stop}>
          Stop
        </button>
        <button className={style.start} type="button" onClick={reset}>
          Reset
        </button>
        <button className={style.start} type="button" onClick={wait}>
          Wait
        </button>
      </div>
    </div>
  );
}
