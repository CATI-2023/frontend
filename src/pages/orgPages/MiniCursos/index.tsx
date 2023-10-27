import { Container } from "@mui/material";
import { Navbar } from "../../../components/navbar/Navbar";
import { ListMiniCursos } from "./components/listMiniCursos";

export function OrganizacaoMiniCursosPage() {
  return (
    <>
      <Navbar title="Minicursos" typeUser="Organização" />
      <Container maxWidth="lg">
        <ListMiniCursos />
      </Container>
    </>
  );
}
