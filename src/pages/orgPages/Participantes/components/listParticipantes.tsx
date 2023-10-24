import {
  Box,
  Button,
  Checkbox,
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
import { participantes, participantesList } from "../../../../Types/type";
import { DefaultsIcons } from "../../../../constants/DefaultIcons";
import { DialogActionsParticipantes } from "./DialogAction";
import { useEffect, useState } from "react";
import {
  deleteParticipante,
  getParticipantes,
} from "../../../../services/participantes";
import useNotification from "../../../../hooks/useNotification";
import { formataCPF, formataCelular } from "../../../../constants/function";

export function ListaParticipantes() {
  const [participantesList, setParticipantes] =
    useState<participantesList | null>(null);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [busca, setBusca] = useState<string>("*");

  async function getParticipantesList() {
    getParticipantes(page, busca)
      .then((res) => {
        if (res.data.participantes.total > 0){
          setTotalPages(Math.ceil(res.data.participantes.total / 10));
          setTotalRows(res.data.participantes.total);
        }
        setParticipantes(res.data.participantes);
      })
      .catch((err) =>
        showNotification({
          message:
            err?.response?.data?.message ?? "Erro ao carregar participantes.",
          type: "error",
        })
      );
  }

  useEffect(() => {
    getParticipantesList();
  }, [page, busca]);

  const [open, setOpen] = useState(false);

  const [selectedParticipante, setSelectedParticipante] =
    useState<participantes | null>(null);

  const showNotification = useNotification();

  const handleOpen = (participante: participantes | null) => {
    setSelectedParticipante(participante);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedParticipante({
      participante_id: 0,
      nome: "",
      foto: "",
      cpf: "",
      telefone: "",
      email: "",
      senha: "",
      organizacao: false,
    });
    setOpen(false);
  };

  const handleDeleteParticipante = async (
    participante_id: number | undefined
  ) => {
    if (participante_id != undefined) {
      await deleteParticipante(participante_id)
        .then((res) => {
          showNotification({
            message: "Participante removido com sucesso " + res,
            type: "success",
            title: "Participante removido",
          });
        })
        .catch((err) => {
          showNotification({
            message: "Erro ao remover o Participante " + err,
            type: "error",
            title: "Participante não removido",
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
            setSelectedParticipante(null);
            handleOpen(null);
          }}
        >
          <DefaultsIcons.AdiconarIcon size={26} />
          Adiconar Participante
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
                  <b>Nome</b>
                </TableCell>
                <TableCell align="center">
                  <b>CPF</b>
                </TableCell>
                <TableCell align="center">
                  <b>Telefone</b>
                </TableCell>
                <TableCell align="center">
                  <b>Email</b>
                </TableCell>
                <TableCell align="center">
                  <b>Organização</b>
                </TableCell>
                <TableCell align="center">
                  <b>Ações</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participantesList != null
                ? participantesList.participantes.map(
                    (participante: participantes) => (
                      <TableRow key={participante.participante_id}>
                        <TableCell align="center">
                          {participante.nome}
                        </TableCell>
                        <TableCell align="center">
                          {formataCPF(participante.cpf)}
                        </TableCell>
                        <TableCell align="center">
                          {formataCelular(participante.telefone)}
                        </TableCell>
                        <TableCell align="center">
                          {participante.email}
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            disabled
                            defaultChecked={participante.organizacao}
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                          />
                          {/* <Switch checked={participante.organizacao} disabled /> */}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="inherit"
                            onClick={() => {
                              handleOpen(participante);
                            }}
                          >
                            <DefaultsIcons.EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => {
                              handleDeleteParticipante(
                                participante?.participante_id
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
      <DialogActionsParticipantes
        Data={selectedParticipante}
        open={open}
        onClose={handleClose}
        title="participante"
      />
    </>
  );
}
