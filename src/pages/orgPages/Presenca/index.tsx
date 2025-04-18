import { Container } from "@mui/material";
import { Navbar } from "../../../components/navbar/Navbar";
import { ListaPresencas } from "./components/listPresencas";
export function OrganizacaoPresencaPage() {
  return (
    <>
      <Navbar title="Registro de Frequência" typeUser="Organização" />
      <Container maxWidth="lg">
        <ListaPresencas />
      </Container>
    </>
  );
}
