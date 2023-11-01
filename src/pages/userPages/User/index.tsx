import { Box, Container, Paper } from "@mui/material";
import { Navbar } from "../../../components/navbar/Navbar";
import { ParticipanteAuth } from "../../../Types/type";
import { InformacoesParticipante } from "./components/informacoesParticipante";
import { ControlledAccordions } from "./components/accordionHome";
import { useFetch } from "../../../hooks/useFetch";

export function UserPage() {
  const { data: participante } = useFetch<ParticipanteAuth>("participantes/eu");

  if (!participante) {
    return <h1>Carregando...</h1>;
  }

  return (
    <>
      <Navbar title={"Área do Participante"} typeUser="User" />
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        marginTop={"1rem"}
        mb={10}
      >
        <Container maxWidth="md">
          <Paper
            sx={{
              p: 4,
            }}
          >
            <InformacoesParticipante participante={participante} />
          </Paper>
          <ControlledAccordions participante={participante} />
        </Container>
      </Box>
    </>
  );
}
