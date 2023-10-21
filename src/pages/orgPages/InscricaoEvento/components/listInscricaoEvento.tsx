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
} from "@mui/material";
import { inscricaoEventoGet } from "../../../../Types/type";
import { DefaultsIcons } from "../../../../constants/DefaultIcons";
import { DialogActionsInscricoesEvento } from "./DialogAction";
import { useState, useEffect } from "react";
import {
  getInscricaoEventos,
  deleteInscricaoEvento,
} from "../../../../services/inscricaoEvento";
import useNotification from "../../../../hooks/useNotification";

export function ListaInscricaoEvento() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [busca, setBusca] = useState<string>("*");

  const [selectedInscricaoEvento, setSelectedInscricaoEvento] =
    useState<inscricaoEventoGet | null>(null);

  const showNotification = useNotification();

  const handleOpen = (inscricao_evento: inscricaoEventoGet | null) => {
    setSelectedInscricaoEvento(inscricao_evento);
    setOpen(true);
  };

  const [inscricaoEventoList, setInscricaoEventoList] = useState<
    inscricaoEventoGet[] | null
  >(null);

  async function getInscricaoEventosList() {
    getInscricaoEventos(page, busca)
      .then((res) => {
        if (res.data.inscricaoEventos.total > 0)
          setTotalPages(Math.floor(res.data.inscricaoEventos.total / 10));
        setInscricaoEventoList(res.data.inscricaoEventos.inscricaoEventos);
      })
      .catch((err) => {
        showNotification({
          message:
            err?.response?.data?.message ??
            "Erro ao carregar a lista de Inscições de Eventos.",
          type: "error",
        });
      });
  }

  useEffect(() => {
    getInscricaoEventosList();
  }, [page, busca]);

  const handleClose = () => {
    setSelectedInscricaoEvento(null);
    setOpen(false);
  };

  const handleDeleteInscricaoEvento = async (
    id_inscricao_evento: number | undefined
  ) => {
    if (id_inscricao_evento != undefined) {
      await deleteInscricaoEvento(id_inscricao_evento)
        .then(() => {
          showNotification({
            message: "Inscrição removida com sucesso. ",
            type: "success",
            title: "Inscrição removida",
          });
        })
        .catch((err) => {
          showNotification({
            message: "Erro ao remover inscrição. " + err,
            type: "error",
            title: "Inscrição não removida",
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
            setSelectedInscricaoEvento(null);
            handleOpen(null);
          }}
        >
          <DefaultsIcons.AdiconarIcon size={26} />
          Adiconar Inscrição
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
                  <b>Evento</b>
                </TableCell>
                <TableCell align="center">
                  <b>Participante</b>
                </TableCell>
                <TableCell align="center">
                  <b>Pagamento</b>
                </TableCell>
                <TableCell align="center">
                  <b>Ações</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inscricaoEventoList != null
                ? inscricaoEventoList.map((inscricao: inscricaoEventoGet) => (
                    <TableRow key={inscricao.inscricao_evento_id}>
                      <TableCell align="center">
                        {inscricao.evento?.ano} - {inscricao.evento?.tema}
                      </TableCell>
                      <TableCell align="center">
                        {inscricao.participante?.nome}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={
                            inscricao.pagamento?.status === "APROVADO"
                              ? "Aprovado"
                              : inscricao.pagamento?.status === "PENDENTE"
                              ? "Pendente"
                              : "Recusado"
                          }
                          color={
                            // Refatorar
                            inscricao.pagamento?.status === "APROVADO"
                              ? "success"
                              : inscricao.pagamento?.status === "PENDENTE"
                              ? "warning"
                              : "error"
                          }
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="inherit"
                          onClick={() => {
                            handleOpen(inscricao);
                          }}
                        >
                          <DefaultsIcons.EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            handleDeleteInscricaoEvento(
                              inscricao?.inscricao_evento_id
                            );
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
      <DialogActionsInscricoesEvento
        Data={selectedInscricaoEvento}
        open={open}
        onClose={handleClose}
        title="Inscrição"
      />
    </>
  );
}
