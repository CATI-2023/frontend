import { Navbar } from "../../../components/navbar/Navbar";
import { ListaEventos } from "./components/listEventos";
import { Container } from "@mui/material";

export function OrganizacaoEventoPage() {
  return (
    <>
      <Navbar title="Eventos" typeUser="Organização" />
      <Container maxWidth="lg">
        <ListaEventos />
      </Container>
    </>
  );
}
