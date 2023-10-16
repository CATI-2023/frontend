import { useEffect, useState } from "react";
import { Navbar } from "../../../components/navbar/Navbar";
import { apoiadores } from "../../../Types/type";
import { getApoiadores } from "../../../services/apoiadores";
import { ListaApoiadores } from "./components/listApoiadores";
import { Container } from "@mui/material";

export function OrganizacaoApoiadoresPage() {
  const [apoiadores, setApoiadores] = useState<apoiadores |null>(null);
  async function getPatrocinadores() {
    getApoiadores()
      .then((res) => setApoiadores(res))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getPatrocinadores();
  }, []);
  return (
    <>
      <Navbar title="Apoiadores" typeUser="Organização" />
      <Container maxWidth="lg">
        <ListaApoiadores apoiadores={apoiadores} />
      </Container>
    </>
  );
}
