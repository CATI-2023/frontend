import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { ParticipanteAuth } from "../../../../Types/type";
import { Clock, NewspaperClipping } from "@phosphor-icons/react";
import { useState } from "react";
import { ActionComprovantePagamento } from "../components/ActionComprovantePagamento";

interface InformacoesParticipanteProps {
  participante: ParticipanteAuth;
}

export function InscricoesEventosCards({
  participante,
}: InformacoesParticipanteProps) {
  const [openActionComprovantePagamento, setOpenActionComprovantePagamento] =
    useState(false);
  const [inscricao, setInscricao] = useState<
    ParticipanteAuth["InscricaoEvento"][0] | null
  >(null);

  const apiHostBase = import.meta.env.VITE_API_URL as string;
  
  if (!participante) {
    return <h1>Carregando...</h1>;
  }

  return (
    <>
      {participante.InscricaoEvento?.map((inscricao) => {
        const evento = inscricao.evento;
        const pagamento = inscricao.pagamento;
        return (
          <Card key={evento.evento_id}>
            <CardMedia
              component="img"
              height="194"
              image={
                apiHostBase + "/download?file=" + evento.banner ||
                "https://via.placeholder.com/200x194.png?text=Banner+do+evento"
              }
              alt={"Banner do evento"}
            />
            <Divider />
            <Box
              display={"flex"}
              flexDirection={{ md: "row", xs: "column" }}
              alignItems={"center"}
              alignContent={"center"}
              justifyItems={"center"}
              justifyContent={"space-around"}
              gap={2}
            >
              <Box p={2} justifyItems={"start"} justifyContent={"start"}>
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
                    {new Date(evento.data_inicio).toLocaleDateString("pt-BR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    my: "1rem",
                    fontSize: "0.675rem",
                    color: "text.secondary",
                  }}
                  textAlign="left"
                >
                  Observações
                </Divider>
                <Typography
                  textAlign={"center"}
                  fontSize={"1rem"}
                >
                  {inscricao.observacoes}
                </Typography>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                gap={2}
                py={2}
                mx={1}
              >
                <Button
                  color="info"
                  variant="contained"
                  size="small"
                  href="https://mpago.la/2DkGmXA"
                  sx={{ textAlign: "center" }}
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
            </Box>
          </Card>
        );
      })}
      <ActionComprovantePagamento
        open={openActionComprovantePagamento}
        onClose={() => setOpenActionComprovantePagamento(false)}
        inscricao={inscricao}
      />
    </>
  );
}
