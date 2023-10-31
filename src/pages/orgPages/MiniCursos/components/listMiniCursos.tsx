import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DefaultsIcons } from "../../../../constants/DefaultIcons";
import { minicurso } from "../../../../Types/type";
import { formataMoeda } from "../../../../constants/function";
import { DialogActionMiniCursos } from "./DialogActionMiniCursos";
import {
  getMiniCursos,
  deleteMiniCurso,
} from "../../../../services/miniCursos";
import useNotification from "../../../../hooks/useNotification";

export function ListMiniCursos() {
  const [minicursoList, setMinicursoList] = useState<minicurso[] | null>(null);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [busca, setBusca] = useState<string>("*");

  const [open, setOpen] = useState(false);
  const [selectedMiniCurso, setSelectedMiniCurso] = useState<minicurso | null>(
    null
  );
  async function getMinicursoList() {
    getMiniCursos(page, busca)
      .then((res) => {
        if (res.data.minicursos.total > 0) {
          setTotalPages(Math.ceil(res.data.minicursos.total / 10));
          setTotalRows(res.data.minicursos.total);
        }
        setMinicursoList(res.data.minicursos.minicursos);
      })
      .catch((err) =>
        showNotification({
          message:
            err?.response?.data?.message ?? "Erro ao carregar Minicursos.",
          type: "error",
        })
      );
  }

  useEffect(() => {
    getMinicursoList();
  }, [page, busca]);

  const handleOpen = (data: minicurso | null) => {
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
          title: "Sucesso ao remover o minicurso" + res,
          message: "Minicurso removido com sucesso",
        });
        handleClose();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        showNotification({
          type: "error",
          title: "Erro ao remover o minicurso",
          message: "Minicurso não removido" + err?.response?.data?.message,
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
          <DefaultsIcons.AdicionarIcon size={26} /> Adicionar minicurso
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  <TextField
                    label="Informe sua busca"
                    fullWidth
                    onChange={(e) => {
                      setBusca(
                        e.target.value.length > 2 ? e.target.value : "*"
                      );
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <b>Título</b>
                </TableCell>
                <TableCell align="center">
                  <b>Data</b>
                </TableCell>
                <TableCell align="center">
                  <b>Valor</b>
                </TableCell>
                <TableCell align="center">
                  <b>Qtde. Vagas</b>
                </TableCell>
                <TableCell align="center">
                  <b>Ministrante</b>
                </TableCell>
                <TableCell align="center">
                  <b>Ações</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {minicursoList != null
                ? minicursoList.map((minicurso: minicurso) => (
                    <TableRow key={minicurso.minicurso_id}>
                      <TableCell align="center">{minicurso.titulo}</TableCell>
                      <TableCell align="center">
                        {new Date(minicurso.data).toLocaleDateString("pt-BR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </TableCell>
                      <TableCell align="center">
                        {formataMoeda(minicurso.valor)}
                      </TableCell>
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
                        <IconButton
                          color="error"
                          onClick={() => {
                            handleDeleteMinicurso(minicurso?.minicurso_id);
                          }}
                        >
                          <DefaultsIcons.ApagarIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                : "Carregando..."}
            </TableBody>
          </Table>
          <Typography margin={"1rem 0 0 1rem"}>
            {"Total de registros: "}
            {totalRows}
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => {
              e.preventDefault();
              setPage(value);
            }}
          />
        </TableContainer>
      </Box>
      <DialogActionMiniCursos
        open={open}
        onClose={handleClose}
        Data={selectedMiniCurso}
      />
    </>
  );
}
