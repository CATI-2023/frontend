import { Box } from "@mui/material";
import "./style.css";
import { TimerEvent } from "../../../../components/Timer/Timer";
// import { Header } from "../../../../components/Header";
import ResponsiveAppBar from "../../../../components/AppBar";
import { styled } from "@mui/system";
export function FirstSection() {

  const BoxTimer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 4em",
    position: "relative",
    height: "30vh",
    [theme.breakpoints.down("sm")]: {
      padding: "0 2em",
    },
    [theme.breakpoints.down("md")]: {
      padding: "0 3em"
    },
    [theme.breakpoints.up("lg")]: {
      padding: "0 em",
      marginTop: "4em"
    },
  }));

  const BoxTema = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    paddingLeft: "4em",
    height: "60vh",
    [theme.breakpoints.up("lg")]: {
    },
    [theme.breakpoints.down("md")]: {
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0 2em",
    },
  }));

  return (
    <>
      <Box
        className="background-first-section"
        id="firstSection"
      >
        <ResponsiveAppBar />
        {/* <Header /> */}
        <BoxTema>
          <p className="text-primary-first-section">
            <span className="typography-first-section ">Inteligência artificial</span>,
            máquinas que aprendem, raciocinam e transformam o{" "}
            <span className="typography-first-section ">futuro</span>.
            {/* <br></br><br></br>De 06 a 10 de novembro. */}
          </p>
        </BoxTema>
        <BoxTimer>
          <TimerEvent />
        </BoxTimer>
      </Box>
    </>
  );
}
