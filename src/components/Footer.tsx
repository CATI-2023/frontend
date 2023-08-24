import { Box } from "@mui/material";
import LogoMarcaUnematPreta from "../assets/LogoripoUnemat-Preto 1.png"
export function Footer() {
  return (
    <>
      <Box
        bgcolor="white"
        height={"200px"}
        mt="4em"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <img src={LogoMarcaUnematPreta} alt="" />
      </Box>
    </>
  );
}
