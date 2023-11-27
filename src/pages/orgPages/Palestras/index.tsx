import { Container } from "@mui/material";
import { Navbar } from "../../../components/navbar/Navbar";
import { ListPalestras } from "./components/listPalestras";

export function OrganizacaoPalestrasPage() {
  return (
    <>
      <Navbar title="Palestras" typeUser="Organização" />
      <Container maxWidth="lg">
        <ListPalestras />
      </Container>
    </>
  );
}
