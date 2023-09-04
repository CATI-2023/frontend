import { Box } from "@mui/material";
import logo from "./LOGO-UNEMAT-SVG-CAMPUS-Branco.svg";

export function LogoMarcaUnemat() {
  return (
    <>
      <Box textAlign={"center"}>
        <img src={logo} className="logoHeader"></img>
      </Box>
    </>
  );
}
