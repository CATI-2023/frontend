import { Box } from "@mui/material";
import { LogoCati } from "../assets/logoCati";
import { LogoMarcaUnemat } from "../assets/logoMarcaUnemat";

export function Header() {
  return (
    <>
      <Box
        height={"6em"}
        color={"white"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        px={8}
      >
        <LogoCati />
        <LogoMarcaUnemat />
      </Box>
    </>
  );
}
