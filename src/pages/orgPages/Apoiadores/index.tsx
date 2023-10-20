import { Navbar } from "../../../components/navbar/Navbar";
import { ListaApoiadores } from "./components/listApoiadores";
import { Container } from "@mui/material";

export function OrganizacaoApoiadoresPage() {

  return (
    <>
      <Navbar title="Colaboradores" typeUser="Organização" />
      <Container maxWidth="lg">
        <ListaApoiadores />
      </Container>
    </>
  );
}
