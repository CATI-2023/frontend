import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { ParticipanteAuth } from "../../../../Types/type";
import { formataCPF, formataTelefone } from "../../../../constants/function";
import { Edit } from "@mui/icons-material";

interface InformacoesParticipanteProps {
  participante: ParticipanteAuth
}

export function InformacoesParticipante({
  participante
}: InformacoesParticipanteProps) {

  return (
    <Box
      flex={1}
      width={1}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"start"}
      gap={2}
    >
      <Avatar
        sx={{ height: "100px", width: "100px" }}
        src={participante.foto}
        alt=""
      />
      <Box
        flex={1}
        mx={2}
        display={"flex"}
        flexDirection={"column"}
      >
        <Stack>
          <Typography
            variant="caption"
            color="text.secondary"
            lineHeight={1}
          >
            Bem vindo de volta,
          </Typography>
          <Typography
            lineHeight={1}

            variant="h6" fontWeight="bold">{participante.nome}</Typography>
        </Stack>
        <Divider sx={{ my: 1, fontSize: "0.675rem", color: "text.secondary" }} textAlign="left">Dados pessoais</Divider>
        <Typography
          variant="subtitle1"
          lineHeight={1.5}
        >
          E-mail: {participante.email}
        </Typography>
        <Typography
          variant="subtitle1"
          lineHeight={1.5}
        >
          CPF: {formataCPF(participante.cpf)}
        </Typography>
        <Typography
          variant="subtitle1"
          lineHeight={1.5}
        >
          Telefone: {formataTelefone(participante.telefone)}
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            startIcon={<Edit />}
          >
            Alterar dados
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
