import { Box } from "@mui/material";
import UnematLogoMarca from "./Unemat.png";

export function LogoMarcaUnemat() {
  return (
    <>
      <Box>
        <img
          style={{ height: "3em" }}
          src={UnematLogoMarca}
          alt="Logo Marca Unemat"
        />
      </Box>
    </>
  );
}
