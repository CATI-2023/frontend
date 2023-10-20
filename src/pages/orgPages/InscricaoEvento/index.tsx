import { Navbar } from "../../../components/navbar/Navbar";
import { ListaInscricaoEvento } from "./components/listInscricaoEvento";
import { Container } from "@mui/material";

export function OrganizacaoInscricaoEventoPage() {

  return (
    <>
      <Navbar title="Inscrições de eventos" typeUser="Organização" />
      <Container maxWidth="lg">
        <ListaInscricaoEvento />
      </Container>
    </>
  );
}
