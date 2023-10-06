import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { InformacoesParticipante } from "./components/informacoesParticipante";
import { ComprovantePagamento } from "./components/comprovantePagamento/comprovantePagamento";
import { inscricaoEventoGet, participantes } from "../../../Types/type";
import { getParticipante } from "../../../services/participantes";
import { useParams } from "react-router-dom";
import { getInscricaoEvento } from "../../../services/inscricaoEvento";
// import { getPagamentos } from "../../../services/pagamentos";

export function UserPage() {
  const [participante, setParticipante] = useState<participantes>(
    {} as participantes
  );
  const [inscricao_evento, setInscricao_evento] = useState<inscricaoEventoGet>(
    {} as inscricaoEventoGet
  );

  const id_partipante = useParams();
  async function ReadParticipante(id: number) {
    await getParticipante(id).then((response) => {
      setParticipante(response.data);
    });
    await getInscricaoEvento(1).then((response) => {
      setInscricao_evento(response.data);
    });
  }
  useEffect(() => {
    ReadParticipante(Number(id_partipante.id));
  }, [id_partipante.id]);
  return (
    <>
      <Container maxWidth="xl">
        <Box display={"flex"} flexDirection={"column"}>
          <InformacoesParticipante
            nome={
              participante.nome != undefined
                ? participante.nome
                : "Carregando dados"
            }
          />
          <ComprovantePagamento
            estado={
              inscricao_evento.pagamento != undefined
                ? inscricao_evento.pagamento.status
                : "APROVADO"
            }
          />
        </Box>
      </Container>
    </>
  );
}
