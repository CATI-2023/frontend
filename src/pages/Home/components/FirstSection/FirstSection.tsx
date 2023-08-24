import { Box } from "@mui/material";
import Cerebro from "../../../../assets/Cerebro.png";
import "./style.css";
import { TimerEvent } from "../../../../components/Timer/Timer";
export function FirstSection() {
  return (
    <>
      <Box
        mt={"-6em"}
        height={"100%"}
        sx={{
          background: `url(${Cerebro})  100% / cover no-repeat`,
          flexShrink: 0,
        }}
        pt={"6em"}
      >
        <Box marginTop={"200px"} px="4em">
          <p className="text-primary-first-section" style={{width: "50%"}}>
            <span className="typography-first-section ">Inteligência artificial</span>,
            máquinas que aprendem, raciocinam e transformam o{" "}
            <span className="typography-first-section ">futuro</span>.
          </p>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          px={"4em"}
          position={"absolute"}
          width={"100%"}
          bottom={"-5em"}
        >
          <TimerEvent />
        </Box>
      </Box>
    </>
  );
}
