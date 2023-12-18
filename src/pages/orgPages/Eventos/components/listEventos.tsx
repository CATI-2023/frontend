import {
  Box,
  Button,
  Chip,
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
import { evento } from "../../../../Types/type";
import { DefaultsIcons } from "../../../../constants/DefaultIcons";
import { DialogActionsEventos } from "./DialogAction";
import { useState } from "react";
import {
  deleteEvento,
  getEventos,
  putEventoSetVigente,
} from "../../../../services/evento";
import useNotification from "../../../../hooks/useNotification";
import useDebounce from "../../../../hooks/useDebounce";

export function ListaEventos() {
  const [eventoList, setEventoList] = useState<evento[] | null>(null);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [busca, setBusca] = useState<string>("*");

  async function updateEventoSetVigente(evento_id: number | undefined) {
    await putEventoSetVigente(evento_id)
      .then(() => {
        showNotification({
          type: "success",
          message: "Evento atualizado com sucesso.",
          title: "Sucesso ao atualizar",
        });
        window.location.reload();
      })
      .catch((err) => {
        showNotification({
          type: "error",
          message: "Erro ao atualizar evento. " + err?.response?.data?.message,
          title: "Erro ao atualizar",
        });
      });
  }

  async function getEventosList() {
    getEventos(page, busca)
      .then((res) => {
        if (res.data.eventos.total > 0) {
          setTotalPages(Math.ceil(res.data.eventos.total / 10));
          setTotalRows(res.data.eventos.total);
        } else {
          setTotalRows(0);
          setTotalPages(0);
        }
        setEventoList(res.data.eventos.eventos);
      })
      .catch((err) =>
        showNotification({
          message: err?.response?.data?.message ?? "Erro ao carregar Eventos.",
          type: "error",
        })
      );
  }

  // DeBounce Function
  useDebounce(
    () => {
      getEventosList();
    },
    [page, busca],
    500
  );

  const [open, setOpen] = useState(false);

  const [selectedEvento, setSelectedEvento] = useState<evento | null>(null);

  const showNotification = useNotification();

  const handleOpen = (evento: evento | null) => {
    setSelectedEvento(evento);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedEvento({
      ano: 0,
      tema: "",
      data_inicio: "",
      data_fim: "",
      qtde_vagas: 0,
      banner_base64: "",
      valor: 0,
      evento_id: 0,
      vigente: false,
    });
    setOpen(false);
  };

  const handleDeleteEvento = async (evento_id: number | undefined) => {
    if (evento_id != undefined) {
      await deleteEvento(evento_id)
        .then((res) => {
          showNotification({
            message: "Evento removido com sucesso " + res,
            type: "success",
            title: "Evento removido",
          });
        })
        .catch((err) => {
          showNotification({
            message: "Erro ao remover o Evento " + err,
            type: "error",
            title: "Evento não removido",
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
            setSelectedEvento(null);
            handleOpen(null);
          }}
        >
          <DefaultsIcons.AdicionarIcon size={26} />
          Adicionar Evento
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
                  <b>Ano</b>
                </TableCell>
                <TableCell align="center">
                  <b>Tema</b>
                </TableCell>
                <TableCell align="center">
                  <b>Data inicío</b>
                </TableCell>
                <TableCell align="center">
                  <b>Data fim</b>
                </TableCell>
                <TableCell align="center">
                  <b>Vigente</b>
                </TableCell>
                <TableCell align="center">
                  <b>Ações</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eventoList != null
                ? eventoList.map((evento: evento) => (
                    <TableRow key={evento.evento_id}>
                      <TableCell align="center">{evento.ano}</TableCell>
                      <TableCell align="center">{evento.tema}</TableCell>
                      <TableCell align="center">
                        {new Date(evento?.data_inicio).toLocaleDateString(
                          "pt-BR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {new Date(evento?.data_fim).toLocaleDateString(
                          "pt-BR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {evento.vigente ? (
                          <>
                            <Chip label="Evento vigente" color="success" />
                          </>
                        ) : (
                          <>
                            <Button
                              variant="contained"
                              onClick={() => {
                                updateEventoSetVigente(evento?.evento_id);
                              }}
                            >
                              <DefaultsIcons.EventoVigenteIcon size={20} />
                              Tornar vigente
                            </Button>
                          </>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="inherit"
                          onClick={() => {
                            handleOpen(evento);
                          }}
                        >
                          <DefaultsIcons.EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            handleDeleteEvento(evento?.evento_id);
                          }}
                        >
                          <DefaultsIcons.ApagarIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
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
      <DialogActionsEventos
        Data={selectedEvento}
        open={open}
        onClose={handleClose}
        title="evento"
      />
    </>
  );
}
