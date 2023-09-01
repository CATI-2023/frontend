import { Box } from "@mui/material";
import LogoMarcaSBCPNG from "../assets/Logo_SBC_Transparente.png";

export function LogoMarcaSBC() {
  return (
    <>
      <Box>
        <img src={LogoMarcaSBCPNG} alt="" className="logoFooterSBC"/>
      </Box>
    </>
  );
}
