import { Box } from "@mui/material";
import "./style.css";
import { LogoMarcaUnemat } from "../assets/logoMarcaUnematPreto";
import { LogoMarcaSBC } from "../assets/logoMarcaSBC";

export function Footer() {
  return (
    <>
      <Box
          bgcolor="white"
          height={"230px"}
          padding="1rem 0"
      >
        <p className="text-footer-section">Apoio</p>
        <Box
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
        >
          <LogoMarcaUnemat />
          <LogoMarcaSBC />
        </Box>
      </Box>
    </>
  );
}
