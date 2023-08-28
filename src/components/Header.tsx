import { Box, styled } from "@mui/material";
import { LogoCati } from "../assets/logoCati";
import { LogoMarcaUnemat } from "../assets/logoMarcaUnemat";
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
    [theme.breakpoints.up("lg")]: {
    },
  }));

  return (
    <>
      <HeaderBox>
        <LogoCati />
        <LogoMarcaUnemat />
      </HeaderBox>
    </>
  );
}
