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
  Typography,
} from "@mui/material";
import { equipe, ParticipanteAuth } from "../../../../../Types/type";
import { useState, useEffect } from "react";
import { getEquipesByParticipante } from "../../../../../services/equipes";
import useNotification from "../../../../../hooks/useNotification";
import { DefaultsIcons } from "../../../../../constants/DefaultIcons";
import { ActionComprovantePagamentoEquipe } from "./ActionComprovantePagamentoEquipe";
import { ExpandableTableRow } from "./subTableMembros";
import { DialogActionEquipes } from "./DialogActionEquipes";
import { Plus } from "@phosphor-icons/react";

interface InformacoesParticipanteProps {
  participante: ParticipanteAuth;
}

export function ListaEquipes({ participante }: InformacoesParticipanteProps) {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [openAddEquipe, setOpenAddEquipe] = useState(false);

  const showNotification = useNotification();

  const [equipeList, setEquipeList] = useState<equipe[] | null>(null);
  const [openActionComprovantePagamento, setOpenActionComprovantePagamento] =
    useState(false);
  const [equipe, setEquipe] = useState<equipe | null>(null);

  async function getEquipesList() {
    getEquipesByParticipante(page, participante.participante_id)
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
      .catch((err) => {
        showNotification({
          message:
            err?.response?.data?.message ??
            "Erro ao carregar a lista de Equipes.",
          type: "error",
        });
      });
  }

  useEffect(() => {
    getEquipesList();
  }, [page]);

  return (
    <>
      <Box display={"flex"} gap={2} flexDirection={"column"} alignItems={"end"}>
        <Button
          variant={"contained"}
          startIcon={<Plus />}
          onClick={() => {
            setOpenAddEquipe(true);
          }}
        >
          Inscrever Equipe
        </Button>
        <TableContainer component={Paper}>
          <Table id={"participante-table"}>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <b>Membros</b>
                </TableCell>
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
                  <b>Comprovante</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {equipeList != null
                ? equipeList.map((equipeItem: equipe) => (
                    <ExpandableTableRow
                      key={equipeItem.equipe_id}
                      equipe={equipeItem}
                      participante={participante}
                    >
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
                            equipeItem.pagamento?.status === "APROVADO"
                              ? "success"
                              : equipeItem.pagamento?.status === "PENDENTE"
                              ? "warning"
                              : "error"
                          }
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          disabled={equipeItem.pagamento?.status === "APROVADO"}
                          onClick={() => {
                            setEquipe(equipeItem);
                            setOpenActionComprovantePagamento(true);
                          }}
                        >
                          <DefaultsIcons.UploadIcon />
                        </IconButton>
                      </TableCell>
                    </ExpandableTableRow>
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
      <ActionComprovantePagamentoEquipe
        open={openActionComprovantePagamento}
        onClose={() => setOpenActionComprovantePagamento(false)}
        equipe={equipe}
      />
      <DialogActionEquipes
        open={openAddEquipe}
        participante={participante.participante_id}
        onClose={() => {
          setOpenAddEquipe(false);
        }}
      />
    </>
  );
}
