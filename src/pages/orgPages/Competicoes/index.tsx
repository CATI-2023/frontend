import { Container } from "@mui/material";
import { Navbar } from "../../../components/navbar/Navbar";
import { ListCompeticoes } from "./components/listCompeticoes";

export function OrganizacaoCompeticoesPage() {
  return (
    <>
      <Navbar title="Competições" typeUser="Organização" />
      <Container maxWidth="lg">
        <ListCompeticoes />
      </Container>
    </>
  );
}
