import { Box } from "@mui/material";

interface IColaborador {
  logo?: string;
  widthPhoto?: string;
  heightPhoto?: string;
  colaboradorTitle?: string;
}

export function ColaboradorCard({ logo, widthPhoto = "auto", heightPhoto = "100%", colaboradorTitle="" }: IColaborador) {
  return (
    <>
      <Box
        width={"20em"}
        height={"10em"}
        border={" 1px solid #c2c2c2"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <img src={logo} alt={colaboradorTitle} width={widthPhoto} height={heightPhoto}/>
      </Box>
    </>
  );
}
