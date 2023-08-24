import { Box } from "@mui/material";
import { Perguntas } from "./components/Perguntas";
import { CaccLogo } from "../../../../assets/CaccLogo";
import "./style.css";
export function FifthSection() {
  return (
    <>
      <Box height={"100vh"} pt={"2em"} textAlign={"center"}>
        <p
          className="primary-text-fifth-section "
          style={{ textAlign: "center", marginBottom: "1em" }}
        >
          PERGUNTAS FREQUENTES
        </p>
        <Perguntas />
        <Perguntas />
        <Perguntas />
        <Perguntas />

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          mt="2em"
        >
          <p className="second-text-fifth-section">Realização</p>
          <CaccLogo />
        </Box>
      </Box>
    </>
  );
}
