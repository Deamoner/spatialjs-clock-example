import React, { useState, useEffect } from "react";
import { Text, Container } from "@react-three/uikit";
import { Input } from "./apfel/input";
import { Button } from "./default/button";
import { Timer, TimerOff } from "@react-three/uikit-lucide";

const StopWatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: any;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startStop = (e: any) => {
    e.stopPropagation();
    setIsRunning(!isRunning);
  };

  const reset = (e: any) => {
    e.stopPropagation();
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  return (
    <Container spacing={2} width={200} flexDirection="column">
      <Container gap={12} flexgrow={1} justifyContent="center">
        <Text fontSize={45}>{formatTime(time)}</Text>
      </Container>
      <Container spacing={2} gap={12} flex-grow={1} justifyContent="center">
        <Button type="button" onClick={startStop}>
          {isRunning ? <TimerOff /> : <Timer />}
        </Button>
        <Button type="button" onClick={reset}>
          <Text>Reset</Text>
        </Button>
      </Container>
    </Container>
  );
};

export default StopWatch;
