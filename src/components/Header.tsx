import { Box, styled } from "@mui/material";
import { LogoCati } from "../assets/logoMarcaCatiCACC";
// import { CaccLogo } from "../assets/CaccLogo";
import "./style.css";

export function Header() {
  const HeaderBox = styled(Box)(({ theme }) => ({
    padding: "4em",
    display: "flex",
    height: "33vh",
    justifyContent: "space-between",
    // alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "2em",
    },
    [theme.breakpoints.down("md")]: {
      padding: "2em",
    },
    [theme.breakpoints.up("lg")]: {},
  }));

  return (
    <>
      <HeaderBox>
        <LogoCati />
        {/* <CaccLogo /> */}
      </HeaderBox>
    </>
  );
}
