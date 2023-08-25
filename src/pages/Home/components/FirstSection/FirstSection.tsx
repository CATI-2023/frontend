import { Box } from "@mui/material";
import Cerebro from "../../../../assets/Cerebro.png";
import "./style.css";
import { TimerEvent } from "../../../../components/Timer/Timer";
import { styled } from "@mui/system";
export function FirstSection() {

  const BoxTimer = styled(Box)(({ theme }) => ({
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    padding:"0 4em",
    position:"absolute",
    width:"100%",
    bottom:"3rem",
    [theme.breakpoints.down("sm")]: {
      padding:"0 6rem",
    },
    [theme.breakpoints.down("md")]: {
    },
    [theme.breakpoints.up("lg")]: {
    },
  }));

  return (
    <>
      <Box
        mt={"-12rem"}
        height={"100%"}
        sx={{
          background: `url(${Cerebro})  100% / cover no-repeat`,
          flexShrink: 0,
        }}
        pt={"7rem"}
    >
        <Box marginTop={"16rem"} px="4rem">
          <p className="text-primary-first-section">
            <span className="typography-first-section ">Inteligência artificial</span>,
            máquinas que aprendem, raciocinam e transformam o{" "}
            <span className="typography-first-section ">futuro</span>.
          </p>
        </Box>
        <BoxTimer>
          <TimerEvent />
        </BoxTimer>
      </Box>
    </>
  );
}
