import { Box, Grid } from "@mui/material";
import UnematLogoMarca from "./Unemat.png";

export function LogoMarcaUnemat() {
  return (
    <>
      <Grid item sm={1} md={2}>
        <Box>
          <img
            // style={{ height: "6em" }}
            src={UnematLogoMarca}
            alt="Logo Marca Unemat"
            className="logo-unemat"
          />
        </Box>
      </Grid>
    </>
  );
}
