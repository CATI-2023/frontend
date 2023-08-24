import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ArrowUp } from "../../../../../assets/ArrowUp";

export function Perguntas() {
  return (
    <>
      <Box
        height={"90px"}
        width={"100%"}
        px={"2em"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
    <Accordion>
      <AccordionSummary expandIcon={<ArrowUp />} aria-controls="panel-content" id="panel-header">
        <Typography>Pergunta</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Conteúdo do Acordeão. Pode ser qualquer coisa que você queira mostrar quando o acordeão é expandido.
        </Typography>
      </AccordionDetails>
    </Accordion>
      </Box>
    </>
  );
}
