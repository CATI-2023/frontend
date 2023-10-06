import { Box } from "@mui/material";

interface InformacoesParticipanteProps {
  nome: string;
}

export function InformacoesParticipante({
  nome,
}: InformacoesParticipanteProps) {
  return (
    <>
      <Box>
        <h2>Bem vindo: {nome}</h2>
      </Box>
    </>
  );
}
