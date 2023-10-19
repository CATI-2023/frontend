import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DefaultsIcons } from "../../../../constants/DefaultIcons";
import { miniCursos, mini_curso } from "../../../../Types/type";
import { formataData, formataMoeda } from "../../../../constants/function";
import { DialogActionMiniCursos } from "./DialogActionMiniCursos";
import { deleteMiniCurso } from "../../../../services/miniCursos";
import useNotification from "../../../../hooks/useNotification";

interface props {
  minicurso: miniCursos | null;
}

export function TableMiniCursos({ minicurso }: props) {
  const [open, setOpen] = useState(false);
  const [selectedMiniCurso, setSelectedMiniCurso] = useState<mini_curso | null>(
    null
  );
  const handleOpen = (data: mini_curso | null) => {
    setOpen(true);
    setSelectedMiniCurso(data);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedMiniCurso({
      data: "",
      descricao: "",
      ministrante_participante_id_reference: 0,
      titulo: "",
      valor: 0,
      qtde_vagas: 0,
    });
  };
  const showNotification = useNotification();

  const handleDeleteMinicurso = async (id_minicurso: number | undefined) => {
    await deleteMiniCurso(id_minicurso)
      .then((res) => {
        showNotification({
          type: "success",
          title: "Sucesso ao remover o mini-curso" + res,
          message: "Mini-curso removido com sucesso",
        });
        handleClose();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        showNotification({
          type: "error",
          title: "Erro ao remover o mini-curso",
          message: "Mini-curso não removido" + err,
        });
      });
  };

  return (
    <>
      <Box
        my={4}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"end"}
        gap={2}
      >
        <Button
          variant={"contained"}
          sx={{ display: "flex", gap: 2 }}
          onClick={() => {
            handleOpen(null);
          }}
        >
          <DefaultsIcons.AdiconarIcon size={26} /> Adicionar mini-curso
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Título</TableCell>
                <TableCell align="center">Descrição</TableCell>
                <TableCell align="center">Data</TableCell>
                <TableCell align="center">Valor</TableCell>
                <TableCell align="center">Qtde. Vagas</TableCell>
                <TableCell align="center">Ministrante</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {minicurso != null
                ? minicurso.minicursos.map((minicurso: mini_curso) => (
                    <>
                      <TableRow>
                        <TableCell align="center">{minicurso.titulo}</TableCell>
                        <TableCell align="center">
                          {minicurso.descricao}
                        </TableCell>
                        <TableCell align="center">
                          {formataData(minicurso.data)}
                        </TableCell>
                        <TableCell align="center">{formataMoeda(minicurso.valor)}</TableCell>
                        <TableCell align="center">
                          {minicurso.qtde_vagas}
                        </TableCell>
                        <TableCell align="center">
                          {minicurso.ministrante?.nome}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => {
                              handleOpen(minicurso);
                            }}
                          >
                            <DefaultsIcons.EditIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => {handleDeleteMinicurso(minicurso?.minicurso_id)}}>
                            <DefaultsIcons.ApagarIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </>
                  ))
                : "Carregando..."}
            </TableBody>
          </Table>
        </TableContainer>
        <DialogActionMiniCursos
          open={open}
          onClose={handleClose}
          Data={selectedMiniCurso}
        />
      </Box>
    </>
  );
}
