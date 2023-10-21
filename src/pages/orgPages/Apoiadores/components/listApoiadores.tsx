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
} from "@mui/material";
import { apoiadores, patrocinadores } from "../../../../Types/type";
import { DefaultsIcons } from "../../../../constants/DefaultIcons";
import { DialogActionsPatrocinadores } from "./DialogAction";
import { useState, useEffect } from "react";
import {
  deleteApoiadores,
  getApoiadores,
} from "../../../../services/apoiadores";
import useNotification from "../../../../hooks/useNotification";

export function ListaApoiadores() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [busca, setBusca] = useState<string>("*");

  const [selectedApoiador, setSelectedApoiador] =
    useState<patrocinadores | null>(null);

  const showNotification = useNotification();

  const handleOpen = (patrocinador: patrocinadores | null) => {
    setSelectedApoiador(patrocinador);
    setOpen(true);
  };

  const [apoiadores, setApoiadores] = useState<apoiadores | null>(null);
  async function getPatrocinadores() {
    getApoiadores(page, busca)
      .then((res) => {
        if (res.patrocinadores.patrocinadores.total > 0)
          setTotalPages(
            Math.floor(res.patrocinadores.patrocinadores.total / 10)
          );
        setApoiadores(res.patrocinadores);
      })
      .catch((err) => {
        showNotification({
          message:
            err?.response?.data?.message ??
            "Erro ao carregar a lista de colaboradores.",
          type: "error",
        });
      });
  }

  useEffect(() => {
    getPatrocinadores();
  }, [page, busca]);

  const handleClose = () => {
    setSelectedApoiador({
      razao_social: "",
      telefone: "",
      nivel: "BRONZE",
      email: "",
      banner_base64: "",
    });
    setOpen(false);
  };

  const handleDeletePatrocinador = async (
    id_patrocinador: number | undefined
  ) => {
    if (id_patrocinador != undefined) {
      await deleteApoiadores(id_patrocinador)
        .then((res) => {
          showNotification({
            message: "Colaborador removido com sucessor" + res,
            type: "success",
            title: "Colaborador removido",
          });
        })
        .catch((err) => {
          showNotification({
            message: "Erro ao remover o colaborador" + err,
            type: "error",
            title: "Colaborador não removido",
          });
        });
      window.location.reload();
    }
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
          variant="contained"
          sx={{ display: "flex", gap: 2 }}
          onClick={() => {
            setSelectedApoiador(null);
            handleOpen(null);
          }}
        >
          <DefaultsIcons.AdiconarIcon size={26} />
          Adiconar colaborador
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={4}>
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
                  <b>Razão Social</b>
                </TableCell>
                <TableCell align="center">
                  <b>Telefone</b>
                </TableCell>
                <TableCell align="center">
                  <b>Nível</b>
                </TableCell>
                <TableCell align="center">
                  <b>Ações</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apoiadores != null
                ? apoiadores.patrocinadores.map(
                    (patrocinador: patrocinadores) => (
                      <TableRow key={patrocinador.patrocinador_id}>
                        <TableCell align="center">
                          {patrocinador.razao_social}
                        </TableCell>
                        <TableCell align="center">
                          {patrocinador.telefone}
                        </TableCell>
                        <TableCell align="center">
                          {patrocinador.nivel}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="inherit"
                            onClick={() => {
                              handleOpen(patrocinador);
                            }}
                          >
                            <DefaultsIcons.EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => {
                              handleDeletePatrocinador(
                                patrocinador?.patrocinador_id
                              );
                            }}
                          >
                            <DefaultsIcons.ApagarIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  )
                : null}
            </TableBody>
          </Table>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => {
              e.preventDefault();
              setPage(value);
            }}
          />{" "}
        </TableContainer>
      </Box>
      <DialogActionsPatrocinadores
        Data={selectedApoiador}
        open={open}
        onClose={handleClose}
        title="colaborador"
      />
    </>
  );
}
