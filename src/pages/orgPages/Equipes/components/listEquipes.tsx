import { useEffect, useState } from "react";
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
import { DefaultsIcons } from "../../../../constants/DefaultIcons";
import { equipe } from "../../../../Types/type";
import { DialogActionEquipes } from "./DialogActionEquipes";
import { getEquipes, deleteEquipe } from "../../../../services/equipes";
import useNotification from "../../../../hooks/useNotification";

export function ListEquipes() {
  const [equipeList, setEquipeList] = useState<equipe[] | null>(null);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [busca, setBusca] = useState<string>("*");

  const [open, setOpen] = useState(false);
  const [selectedEquipe, setSelectedEquipe] = useState<equipe | null>(null);
  async function getEquipeList() {
    getEquipes(page, busca)
      .then((res) => {
        if (res.data.equipes.total > 0) {
          setTotalPages(Math.ceil(res.data.equipes.total / 10));
          setTotalRows(res.data.equipes.total);
        } else {
          setTotalRows(0);
          setTotalPages(0);
        }
        setEquipeList(res.data.equipes.equipes);
      })
      .catch((err) =>
        showNotification({
          message:
            err?.response?.data?.message ?? "Erro ao carregar Competições.",
          type: "error",
        })
      );
  }

  useEffect(() => {
    getEquipeList();
  }, [page, busca]);

  const handleOpen = (data: equipe | null) => {
    setOpen(true);
    setSelectedEquipe(data);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEquipe({
      nome: "",
    });
  };

  const showNotification = useNotification();

  const handleDeleteEquipe = async (id_equipe: number | undefined) => {
    await deleteEquipe(id_equipe)
      .then(() => {
        showNotification({
          type: "success",
          title: "Sucesso ao remover a Equipe.",
          message: "Equipe removida com sucesso",
        });
        handleClose();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        showNotification({
          type: "error",
          title: "Erro ao remover a Equipe.",
          message: "Equipe não removida. " + err?.response?.data?.message,
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
          <DefaultsIcons.AdicionarIcon size={26} /> Adicionar Equipe
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={5}>
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
                  <b>Competição</b>
                </TableCell>
                <TableCell align="center">
                  <b>Pagamento</b>
                </TableCell>
                <TableCell align="center">
                  <b>Gerenciar Membros</b>
                </TableCell>
                <TableCell align="center">
                  <b>Ações</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {equipeList != null
                ? equipeList.map((equipeItem: equipe) => (
                    <TableRow key={equipeItem.equipe_id}>
                      <TableCell align="center">{equipeItem.nome}</TableCell>
                      <TableCell align="center">
                        {equipeItem.competicao?.titulo}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={
                            equipeItem.pagamento?.status === "APROVADO"
                              ? "Aprovado"
                              : equipeItem.pagamento?.status === "PENDENTE"
                              ? "Pendente"
                              : "Recusado"
                          }
                          color={
                            // Refatorar
                            equipeItem.pagamento?.status === "APROVADO"
                              ? "success"
                              : equipeItem.pagamento?.status === "PENDENTE"
                              ? "warning"
                              : "error"
                          }
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          onClick={() => {
                            // updateEventoSetVigente(evento?.evento_id);
                          }}
                        >
                          <DefaultsIcons.AdicionarIcon size={20} />
                          Abrir
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                            handleOpen(equipeItem);
                          }}
                        >
                          <DefaultsIcons.EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            handleDeleteEquipe(equipeItem?.equipe_id);
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
      <DialogActionEquipes
        open={open}
        onClose={handleClose}
        Data={selectedEquipe}
      />
    </>
  );
}
