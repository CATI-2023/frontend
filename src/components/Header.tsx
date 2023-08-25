import { Grid, styled } from "@mui/material";
import { LogoCati } from "../assets/logoCati";
import { LogoMarcaUnemat } from "../assets/logoMarcaUnemat";
import "./style.css";

export function Header() {

  const HeaderGrid = styled(Grid)(({ theme }) => ({
    marginTop: "2em",
    padding: "0 4em",
    height: "10em",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      marginTop: "1em",
      justifyContent: "center",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "2em",
    },
    [theme.breakpoints.up("lg")]: {
    },
  }));

  return (
    <>
      <HeaderGrid
        container
        spacing={2}
      >
        <LogoCati />
        <LogoMarcaUnemat />
      </HeaderGrid>
    </>
  );
}
