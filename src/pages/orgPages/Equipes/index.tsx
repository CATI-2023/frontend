import { Container } from "@mui/material";
import { Navbar } from "../../../components/navbar/Navbar";
import { ListEquipes } from "./components/listEquipes";

export function OrganizacaoEquipesPage() {
  return (
    <>
      <Navbar title="Equipes" typeUser="Organização" />
      <Container maxWidth="lg">
        <ListEquipes />
      </Container>
    </>
  );
}
