import { Box } from "@mui/material";
import "./style.css";
import { LogoMarcaUnemat } from "../assets/logoMarcaUnematPreto";
import { LogoMarcaSBC } from "../assets/logoMarcaSBC";
import { LogoMarcaMPMT } from "../assets/logoMarcaMPMT";

export function Footer() {
  return (
    <>
      <Box
          bgcolor="white"
          minHeight={"230px"}
          padding={"1rem 0"}
      >
        <p className="text-footer-section">Apoio</p>
        <Box
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          marginTop={"1.5rem"}
        >
          <LogoMarcaUnemat />
          <LogoMarcaSBC />
          <LogoMarcaMPMT />
        </Box>
      </Box>
    </>
  );
}
