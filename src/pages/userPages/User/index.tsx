import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { InformacoesParticipante } from "./components/informacoesParticipante";
import { ComprovantePagamento } from "./components/comprovantePagamento/comprovantePagamento";
import { inscricaoEventoGet } from "../../../Types/type";
// import { getParticipante } from "../../../services/participantes";
import { useParams } from "react-router-dom";
import { getInscricaoEvento } from "../../../services/inscricaoEvento";
import { Navbar } from "../../../components/navbar/Navbar";
// import { getPagamentos } from "../../../services/pagamentos";
// import { getPagamentos } from "../../../services/pagamentos";

export function UserPage() {
  const [inscricao_evento, setInscricao_evento] = useState<inscricaoEventoGet>(
    {} as inscricaoEventoGet
  );

  const id_partipante = useParams();
  async function ReadParticipante(id: number) {
    await getInscricaoEvento(id).then((response) => {
      setInscricao_evento(response.data);
    });
  }
  useEffect(() => {
    ReadParticipante(Number(id_partipante.id));
  }, [id_partipante.id]);
  return (
    <>
      <Container maxWidth="xl">
        <Navbar title="Participante" typeUser="User"/>
        <Box display={"flex"} flexDirection={"column"}>
          <InformacoesParticipante
            nome={
              inscricao_evento.participante?.nome != undefined
                ? inscricao_evento.participante?.nome
                : "Carregando dados"
            }
          />
          <ComprovantePagamento
            idParticipante={
              inscricao_evento.participante?.participante_id != undefined
                ? Number(inscricao_evento.participante?.participante_id)
                : 0
            }
            imgParticipante={
              inscricao_evento.pagamento?.comprovante_base64 != undefined
                ? inscricao_evento.pagamento?.comprovante_base64
                : ""
            }
            estado={
              inscricao_evento.pagamento?.status != undefined
                ? inscricao_evento.pagamento?.status
                : "APROVADO"
            }
          />
        </Box>
      </Container>
    </>
  );
}
