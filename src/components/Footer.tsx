import { Box } from "@mui/material";
import "./style.css";
import LogoMarcaUnematPreta from "../assets/LOGO-UNEMAT-PRETO-CAMPUS.png";
import LogoMarcaSBCPNG from "../assets/Logo_SBC_Transparente.png";
import LogoMPMT from "../assets/mpmt_.jpg";
import LogoTIU from "../assets/LOGO-TIU-COLORIDO.png";

export function Footer() {
  return (
    <>
      <Box bgcolor="white" minHeight={"230px"} padding={"1rem 0"}>
        <p className="text-footer-section">Apoio</p>
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent={"space-evenly"}
          alignItems={"center"}
        >
          <img src={LogoMarcaUnematPreta} alt="" className="logoFooterUnemat"/>
          <img src={LogoTIU} alt="" className="logoFooterUnemat" />
          <img src={LogoMarcaSBCPNG} alt="" className="logoFooterUnemat" />
          <img src={LogoMPMT} alt="" className="logoFooterUnemat" />
        </Box>
      </Box>
    </>
  );
}
