import { Box } from "@mui/material";
import "./style.css";
import { Tempo } from "./components/Tempo";
import { useState, useEffect } from 'react';

export function TimerEvent() {
  const targetDate = new Date('2023-11-01T23:59:59')
  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(timeLeft);
    }, 1000);
    
    return () => {
      clearInterval(interval);
    };
  }, [targetDate]);
  
  const formatTime = (value: number) => {
    return value < 10 ? `0${value}` : value;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calculateTimeLeft = (targetDate: Date|number|any) => {
    const now = new Date().getTime();
    const difference = targetDate - now;
  
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
  return (
    <>
      <Box
        sx={{
          width: "100%",
          py: "1em",
          borderRadius: "15px",
          backgroundColor: "#00e0e6",
          mt: "100px",
        }}
        display={"flex"}
        alignItems={"stretch"}
        flexDirection={"column"}
        justifyContent={"center"}
        gap={1}
      >
        <Box
          display={"flex"}
          //   bgcolor={"red"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <p className="Timer-primary-text">Inscrições Encerram em:</p>
        </Box>
        <Box display={"flex"} justifyContent={"space-around"} alignItems={"center"} >
          <Tempo titulo="Dias" tempo={String(timeLeft.days)}/>
          <Tempo titulo="Horas" tempo={String(formatTime(timeLeft.hours))}/>
          <Tempo titulo="Minutos" tempo={String(formatTime(timeLeft.minutes))}/>
          <Tempo titulo="Segundos" tempo={String(formatTime(timeLeft.seconds))}/>
        </Box>
        

      </Box>
    </>
  );
}
