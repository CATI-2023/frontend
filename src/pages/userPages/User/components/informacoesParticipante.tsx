import { Avatar, Box, Button } from "@mui/material";

interface InformacoesParticipanteProps {
  nome?: string;
  img_participante?: string;
  numero_telefone?: string;
}

export function InformacoesParticipante({
  nome,
  numero_telefone,
  img_participante,
}: InformacoesParticipanteProps) {
  return (
    <>
      <Box display={"flex"} alignItems={"center"} flexDirection={{xs: "column", sm: "column", md: "column", lg: "row", xl: "row"}} justifyContent={"space-between"} m={2}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"start"}
          gap={2}
        >
          <Avatar
            sx={{ height: "100px", width: "100px" }}
            src={img_participante}
            alt=""
          />
          <Box display={"flex"} flexDirection={"column"}>
            <p>Bem vindo: <span style={{fontSize: "10px"}}>{nome}</span></p>
            <p>telefone: <span style={{fontSize: "10px"}}>{numero_telefone}</span></p>
          </Box>
        </Box>
        <Button variant="contained">Alterar dados</Button>
      </Box>
    </>
  );
}
