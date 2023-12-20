import { Box } from "@mui/material";
import { SxProps } from "@mui/material/styles";
import Logo from "./LOGO_CATI_CACCUNEMAT-PRETO.png";

type Props = {
  sx: SxProps;
};

export function LogoCatiPreto({ sx }: Props) {
  return (
    <Box sx={sx}>
      <img src={Logo} alt="Logo CATI" width={"100%"} height={"auto"}/>
    </Box>
  );
}
