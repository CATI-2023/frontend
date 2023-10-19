import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Navbar } from "../../../components/navbar/Navbar";
import { TableMiniCursos } from "./components/tableMiniCursos";
import { miniCursos } from "../../../Types/type";
import { getMiniCursos } from "../../../services/miniCursos";

export function OrganizacaoMiniCursosPage() {
  const [miniCursos, setMiniCursos] = useState<miniCursos | null>(null);
  async function getMinicursos() {
    await getMiniCursos()
      .then((res) => {
        setMiniCursos(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getMinicursos();
  }, []);

  return (
    <>
      <Navbar title="Mini cursos" typeUser="Organização" />
      <Container maxWidth="lg">
        <TableMiniCursos minicurso={miniCursos} />
      </Container>
    </>
  );
}
