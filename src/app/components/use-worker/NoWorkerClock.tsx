"use client";

import { useState, useEffect } from "react";
import { LocaleTimeDate } from "@/app/types";
import StyledClock from "./clock/StyledClock";

const getLocaleTimeDate = (): LocaleTimeDate => {
  const now = new Date();
  return {
    time: now.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false
    }),
    date: now.toLocaleDateString([], { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      weekday: 'long' 
    }),
  };
};

const NoWorkerClock = () => {
  const [now, setNow] = useState<LocaleTimeDate>(() => ({
    time: "",
    date: "",
  }));

  const { time, date } = now;

  useEffect(() => {
    setNow(getLocaleTimeDate());

    const timer = setInterval(() => {
      const nextTimeDate = getLocaleTimeDate();
      
      setNow(nextTimeDate);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <StyledClock
      aria-label="Clock"
      role="timer"
      title={date}
      suppressHydrationWarning
    >
      {time}
    </StyledClock>
  );
};

export default NoWorkerClock;