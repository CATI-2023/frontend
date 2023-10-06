import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { InformacoesParticipante } from "./components/informacoesParticipante";
import { InformacoesEvento } from "./components/informacoesEvento";
import { ComprovantePagamento } from "./components/comprovantePagamento/comprovantePagamento";
import { inscricaoEventoGet, participantes } from "../../../Types/type";
import { getParticipante } from "../../../services/participantes";
import { useParams } from "react-router-dom";
import { getInscricaoEvento } from "../../../services/inscricaoEvento";
import { Navbar } from "../../../components/navbar/Navbar";
// import { getPagamentos } from "../../../services/pagamentos";

export function UserPage() {
  const [participante, setParticipante] = useState<participantes>(
    {} as participantes
  );
  const [inscricao_evento, setInscricao_evento] = useState<inscricaoEventoGet>(
    {} as inscricaoEventoGet
  );

  const id_partipante = useParams();

  return (
    <>
      <Navbar title="Dashboard" typeUser="User" />
      <Container maxWidth="xl">
        <Box display={"flex"} flexDirection={"column"}>
          <InformacoesParticipante participanteID={Number(id_partipante.id)} />
          <InformacoesEvento participanteID={Number(id_partipante.id)} />
          {/* <ComprovantePagamento
            estado={
              inscuricao_evento.pagamento != undefined
                ? inscricao_evento.pagamento.status
                : "APROVADO"
            }
          /> */}
        </Box>
      </Container>
    </>
  );
}
