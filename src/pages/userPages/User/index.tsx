import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { Navbar } from "../../../components/navbar/Navbar";
import { ParticipanteAuth } from "../../../Types/type";
import { InformacoesParticipante } from "./components/informacoesParticipante";
import { useFetch } from "../../../hooks/useFetch";
import { Clock, NewspaperClipping } from "@phosphor-icons/react";
import { useState } from "react";
import { ActionComprovantePagamento } from "./components/ActionComprovantePagamento";
import { redirect } from "react-router";

export function UserPage() {
  const [openActionComprovantePagamento, setOpenActionComprovantePagamento] =
    useState(false);
  const [inscricao, setInscricao] = useState<
    ParticipanteAuth["InscricaoEvento"][0] | null
  >(null);

  // Trago o usuário logado (participante) através do access token (abstraído no hook useFetch)
  // É possível usar o useFetch para qlqr rota, por padrão ele já manda o token no header
  const { data: participante } = useFetch<ParticipanteAuth>("participantes/eu");

  // Se o participante não existir, retorna um loading
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
          <Box>
            <Card variant="outlined" sx={{ padding: "1rem", my: "1rem" }}>
              <Typography fontSize={"1.3em"} fontWeight={"bold"}>
                Minhas inscrições
              </Typography>
            </Card>
            {participante.InscricaoEvento?.map((inscricao) => {
              const evento = inscricao.evento;
              const pagamento = inscricao.pagamento;
              return (
                <Card
                  sx={{
                    maxWidth: 345,
                  }}
                  key={evento.evento_id}
                >
                  <CardMedia
                    component="img"
                    height="194"
                    image={
                      evento.banner_base64 ||
                      "https://via.placeholder.com/200x194.png?text=Banner+do+evento"
                    }
                    alt={"Banner do evento"}
                  />
                  <Divider />
                  <Box p={2}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      textAlign="left"
                      mb={1}
                    >
                      {evento.tema} {" - "} {evento.ano}
                    </Typography>
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                      <Clock fontSize="1rem" weight="duotone" />
                      <Typography variant="caption">
                        {new Date(evento.data_inicio).toLocaleDateString(
                          "pt-BR",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider
                    sx={{
                      my: 1,
                      fontSize: "0.675rem",
                      color: "text.secondary",
                    }}
                    textAlign="left"
                  >
                    Pagamento
                  </Divider>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    gap={2}
                    py={2}
                    px={1}
                  >
                    <Button
                      color="info"
                      variant="contained"
                      size="small"
                      href="https://mpago.la/2DkGmXA"
                    >
                      Clique aqui para realizar o pagamento
                    </Button>
                    <Chip
                      label={
                        pagamento.status === "APROVADO"
                          ? "Pagamento aprovado"
                          : pagamento.status === "PENDENTE"
                          ? "Pagamento pendente"
                          : "Pagamento recusado"
                      }
                      color={
                        // Refatorar
                        pagamento.status === "APROVADO"
                          ? "success"
                          : pagamento.status === "PENDENTE"
                          ? "warning"
                          : "error"
                      }
                    />
                    <Button
                      disabled={pagamento.status === "APROVADO"}
                      startIcon={<NewspaperClipping />}
                      color="primary"
                      size="small"
                      sx={{
                        textTransform: "none",
                      }}
                      onClick={() => {
                        setInscricao(inscricao);
                        setOpenActionComprovantePagamento(true);
                      }}
                    >
                      Enviar comprovante
                    </Button>
                  </Box>
                  <Divider
                    sx={{
                      my: 1,
                      fontSize: "0.675rem",
                      color: "text.secondary",
                    }}
                    textAlign="left"
                  >
                    Observações
                  </Divider>
                  <Typography padding={"1rem"} textAlign={"center"}>
                    {inscricao.observacoes}
                  </Typography>
                  <Divider />
                </Card>
              );
            })}
          </Box>
        </Container>
      </Box>
      <ActionComprovantePagamento
        open={openActionComprovantePagamento}
        onClose={() => setOpenActionComprovantePagamento(false)}
        inscricao={inscricao}
      />
    </>
  );
}
