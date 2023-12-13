import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { ParticipanteAuth, participante } from "../../../../Types/type";
import { formataCPF, formataTelefone } from "../../../../constants/function";
import { DefaultsIcons } from "../../../../constants/DefaultIcons";
import { DialogActionsParticipantes } from "./DialogEditParticipante";
import { useState } from "react";

interface InformacoesParticipanteProps {
  participante: ParticipanteAuth;
}

export function InformacoesParticipante({
  participante,
}: InformacoesParticipanteProps) {
  const [open, setOpen] = useState(false);
  const [selectedParticipante, setSelectedParticipante] =
    useState<participante | null>(null);

  const handleOpen = (participante: participante | null) => {
    setSelectedParticipante(participante);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedParticipante({
      participante_id: 0,
      nome: "",
      foto: "",
      cpf: "",
      telefone: "",
      email: "",
      senha: "",
      organizacao: false,
    });
    setOpen(false);
  };
  
  return (
    <Box
      flex={1}
      width={1}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"start"}
      gap={2}
      flexDirection={{xs: "column", md:"row"}}
    >
      <Avatar sx={{ height: 200, width: 200 }} src={participante.foto} alt="" />
      <Box flex={1} mx={2} display={"flex"} flexDirection={"column"}>
        <Stack>
          <Typography variant="caption" color="text.secondary" lineHeight={1}>
            Bem vindo de volta,
          </Typography>
          <Typography lineHeight={2} variant="h6" fontWeight="bold">
            {participante.nome}
          </Typography>
        </Stack>
        <Divider
          sx={{ my: 1, fontSize: "0.675rem", color: "text.secondary" }}
          textAlign="left"
        >
          Dados pessoais
        </Divider>
        <Typography variant="subtitle1" lineHeight={1.5}>
          E-mail: {participante.email}
        </Typography>
        <Typography variant="subtitle1" lineHeight={1.5}>
          CPF: {formataCPF(participante.cpf)}
        </Typography>
        <Typography variant="subtitle1" lineHeight={1.5}>
          Telefone: {formataTelefone(participante.telefone)}
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            startIcon={<DefaultsIcons.EditIcon />}
            onClick={() => {
              handleOpen(participante);
            }}
          >
            Alterar dados
          </Button>
        </Box>
      </Box>
      <DialogActionsParticipantes
        Data={selectedParticipante}
        open={open}
        onClose={handleClose}
        title="participante"
      />
    </Box>
  );
}
