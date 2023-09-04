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
        p={"4em 0"}
        style={{
          background: `url(${Circuitoipresso})  100% / cover no-repeat`,
          flexShrink: 0,
        }}
      >
        <p className="primary-text-thid-section ">Palestrantes</p>
        <Box
          display={"grid"}
          gridTemplateColumns={"auto auto"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
          justifyItems={"center"}
          width={"100%"}
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
