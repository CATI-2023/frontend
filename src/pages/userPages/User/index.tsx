import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { ComprovantePagamento } from "./components/comprovantePagamento/comprovantePagamento";
import { Navbar } from "../../../components/navbar/Navbar";
import { getEuParticipante } from "../../../services/participantes";
import { ParticipanteAuth } from "../../../Types/type";
import { InformacoesParticipante } from "./components/informacoesParticipante";

export function UserPage() {
  const [participante, setParticipante] = useState<ParticipanteAuth>(
    {} as ParticipanteAuth
  );
  // const id_partipante = useParams();
  async function ReadParticipante(token: string) {
    await getEuParticipante(token).then((response) => {
      setParticipante(response.data);
      console.log(response.data);
    });
  }
  console.log(participante);
  useEffect(() => {
    ReadParticipante(localStorage.getItem("accessToken")!);
  }, []);
  return (
    <>
      <Container maxWidth="xl">
        <Navbar title={""} typeUser="User" />
        <Box display={"flex"} flexDirection={"column"}>
          <InformacoesParticipante
            nome={participante?.nome}
            img_participante={participante?.foto}
            numero_telefone={participante.telefone}
          />
          <ComprovantePagamento
            idParticipante={
              participante.InscricaoEvento?.[0].pagamento.pagamento_id
            }
            imgParticipante={
              participante.InscricaoEvento?.[0].pagamento.comprovante_base64
            }
            estado={participante.InscricaoEvento?.[0].pagamento.status}
          />
        </Box>
      </Container>
      {/* <Container maxWidth="xl">
        <Navbar title="Participante" typeUser="User"/>
        <Box display={"flex"} flexDirection={"column"}>
          <InformacoesParticipante
            nome={
              participante.participante?.nome != undefined
                ? participante.participante?.nome
                : "Carregando dados"
            }
          />
          
        </Box>
      </Container> */}
    </>
  );
}
