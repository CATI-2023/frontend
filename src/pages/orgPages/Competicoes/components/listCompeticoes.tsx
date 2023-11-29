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
import { competicao } from "../../../../Types/type";
import { DialogActionCompeticoes } from "./DialogActionCompeticoes";
import {
  getCompeticoes,
  deleteCompeticao,
} from "../../../../services/competicoes";
import useNotification from "../../../../hooks/useNotification";

export function ListCompeticoes() {
  const [competicaoList, setCompeticaoList] = useState<competicao[] | null>(
    null
  );

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [busca, setBusca] = useState<string>("*");

  const [open, setOpen] = useState(false);
  const [selectedCompeticao, setSelectedCompeticao] =
    useState<competicao | null>(null);
  async function getCompeticaoList() {
    getCompeticoes(page, busca)
      .then((res) => {
        if (res.data.competicoes.total > 0) {
          setTotalPages(Math.ceil(res.data.competicoes.total / 10));
          setTotalRows(res.data.competicoes.total);
        } else {
          setTotalRows(0);
          setTotalPages(0);
        }
        setCompeticaoList(res.data.competicoes.competicoes);
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
    getCompeticaoList();
  }, [page, busca]);

  const handleOpen = (data: competicao | null) => {
    setOpen(true);
    setSelectedCompeticao(data);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCompeticao({
      descricao: "",
      titulo: "",
      qtde_membros_equipe: 0,
      inscricao_data_inicio: "",
      inscricao_data_fim: "",
      valor_inscricao: 0,
      regulamento_base64: "",
      banner_base64: "",
    });
  };

  const showNotification = useNotification();

  const handleDeleteCompeticao = async (id_competicao: number | undefined) => {
    await deleteCompeticao(id_competicao)
      .then(() => {
        showNotification({
          type: "success",
          title: "Sucesso ao remover o Competição.",
          message: "Competição removido com sucesso",
        });
        handleClose();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        showNotification({
          type: "error",
          title: "Erro ao remover o Competição.",
          message: "Competição não removida. " + err?.response?.data?.message,
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
          <DefaultsIcons.AdicionarIcon size={26} /> Adicionar Competição
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
                  <b>Título</b>
                </TableCell>
                <TableCell align="center">
                  <b>Período Inscrição</b>
                </TableCell>
                <TableCell align="center">
                  <b>Qtde Membros da Equipe</b>
                </TableCell>
                <TableCell align="center">
                  <b>Valor Inscrição</b>
                </TableCell>
                <TableCell align="center">
                  <b>Ações</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {competicaoList != null
                ? competicaoList.map((competicaoItem: competicao) => (
                    <TableRow key={competicaoItem.competicao_id}>
                      <TableCell align="center">
                        {competicaoItem.titulo}
                      </TableCell>
                      <TableCell align="center">
                        {"De "}{new Date(competicaoItem.inscricao_data_inicio ?? "").toLocaleDateString(
                          "pt-BR",
                          {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )}{" até "}
                        {new Date(competicaoItem.inscricao_data_fim ?? "").toLocaleDateString(
                          "pt-BR",
                          {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {competicaoItem.qtde_membros_equipe}
                      </TableCell>
                      <TableCell align="center">
                        {"R$"}{competicaoItem.valor_inscricao}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                            handleOpen(competicaoItem);
                          }}
                        >
                          <DefaultsIcons.EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            handleDeleteCompeticao(
                              competicaoItem?.competicao_id
                            );
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
      <DialogActionCompeticoes
        open={open}
        onClose={handleClose}
        Data={selectedCompeticao}
      />
    </>
  );
}
