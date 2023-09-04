import { Box } from "@mui/material";
import "./style.css";
import { Palestrante } from "./components/palestrante";
import Circuitoipresso from "../../../../assets/CircuitosImpressos.png";
export function ThirdSection() {
  return (
    <>
      <Box
        height={"auto"}
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        py={"4rem"}
        style={{
          background: `url(${Circuitoipresso})  100% / cover no-repeat`,
          flexShrink: 0,
        }}
      >
        <p className="primary-text-thid-section ">Palestrantes</p>
        <Box
          display={"grid"}
          gridTemplateColumns={{
            xs: "auto",
            sm: "auto",
            md: "auto",
            lg: "auto auto",
            xl: "auto atuo",
          }}
          alignItems={"center"}
          justifyContent={"space-evenly"}
          justifyItems={"center"}
        >
          <Palestrante />
          <Palestrante />
          <Palestrante />
          <Palestrante />
          <Palestrante />
          <Palestrante />
          <Palestrante />
        </Box>
      </Box>
    </>
  );
}
