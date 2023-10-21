import { Navbar } from "../../../components/navbar/Navbar";
import { ListaParticipantes } from "./components/listParticipantes";
import { Container } from "@mui/material";

export function OrganizacaoParticipantePage() {
  return (
    <>
      <Navbar title="Participantes" typeUser="Organização" />
      <Container maxWidth="lg">
        <ListaParticipantes />
      </Container>
    </>
  );
}
