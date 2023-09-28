import { Box } from "@mui/material";
import { LogoMarcaUnemat } from "../assets/logoMarcaUnematPreto";
import { LogoMarcaSBC } from "../assets/logoMarcaSBC";

export function Footer() {
  return (
    <>
      <Box
        bgcolor="white"
        height={"200px"}
        padding="2rem 0"
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        {/* <img src={LogoMarcaUnematPreta} alt="" />
        <img src={LogoMarcaSBC} alt="" /> */}
        <LogoMarcaUnemat />
        <LogoMarcaSBC />
      </Box>
    </>
  );
}
