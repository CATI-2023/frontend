import { Box } from "@mui/material";
import "./style.css";
import { Tempo } from "./components/Tempo";
import { useState, useEffect } from 'react';
import { styled } from "@mui/system";

export function TimerEvent() {
  const targetDate = new Date('2023-11-06T23:59:59')
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
  const calculateTimeLeft = (targetDate: Date | number | any) => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  const BoxTimer = styled(Box)(({ theme }) => ({
    width: "80%",
    padding: "1em 0",
    borderRadius: "2em",
    backgroundColor: "#00e0e6",
    display: "flex",
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.up("lg")]: {
    },
    [theme.breakpoints.down("md")]: {
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      borderRadius: "1em",
    },
  }));

  const BoxClock = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    [theme.breakpoints.down("sm")]: {
      // display: "block"
    },
    [theme.breakpoints.down("md")]: {
    },
    [theme.breakpoints.up("lg")]: {
    },
  }));

  return (
    <>
      <BoxTimer
        gap={1}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          textAlign={"center"}
        >
          <p className="timer-primary-text">Inscrições Encerram em:</p>
        </Box>
        <BoxClock >
          <Tempo titulo="Dias" tempo={String(timeLeft.days)} />
          <Tempo titulo="Horas" tempo={String(formatTime(timeLeft.hours))} />
          <Tempo titulo="Minutos" tempo={String(formatTime(timeLeft.minutes))} />
          <Tempo titulo="Segundos" tempo={String(formatTime(timeLeft.seconds))} />
        </BoxClock>


      </BoxTimer>
    </>
  );
}
