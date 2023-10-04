import { Box } from "@mui/material";
import LogoMarcaUnematPreta from "../assets/LOGO-UNEMAT-PRETO-CAMPUS.png";

export function LogoMarcaUnemat() {
  return (
    <>
      <Box>
        <img src={LogoMarcaUnematPreta} alt="" className="logoFooterUnemat" />
      </Box>
    </>
  );
}
