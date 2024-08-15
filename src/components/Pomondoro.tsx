import React, { useState, useEffect } from "react";
import { Text, Container } from "@react-three/uikit";
import { Button } from "@react-three/uikit-apfel";
import { Timer, TimerOff } from "@react-three/uikit-lucide";

const Pomondoro: React.FC = () => {
  const [time, setTime] = useState(30 * 60 * 1000); // 30 minutes in milliseconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: any;
    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 10);
      }, 10);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const startStop = (e: any) => {
    e.stopPropagation();
    setIsRunning(!isRunning);
  };

  const reset = (e: any) => {
    e.stopPropagation();
    setTime(30 * 60 * 1000);
    setIsRunning(false);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Container spacing={2} width={200} flexDirection="column">
      <Container gap={12} flex-grow={1} justifyContent="center">
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

export default Pomondoro;
