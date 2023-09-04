import { Box } from "@mui/material";
import logo from "./LOGO_CATI_CACCUNEMAT_Branco.svg";

export function LogoCati() {
  return (
    <>
      <Box textAlign={"center"}>
        <img src={logo} className="logoHeader"></img>
      </Box>
    </>
  );
}
