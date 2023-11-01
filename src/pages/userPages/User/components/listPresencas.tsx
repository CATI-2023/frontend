import {
  Box,
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
import { frequencia, ParticipanteAuth } from "../../../../Types/type";
import { useState, useEffect } from "react";
import { getFrequencias } from "../../../../services/frequencia";
import useNotification from "../../../../hooks/useNotification";

interface InformacoesParticipanteProps {
  participante: ParticipanteAuth;
}

export function ListaPresencas({ participante }: InformacoesParticipanteProps) {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);

  const showNotification = useNotification();

  const [frequenciaList, setPresencaList] = useState<frequencia[] | null>(null);

  async function getPresencasList() {
    getFrequencias(page, participante.nome)
      .then((res) => {
        if (res.data.frequencia.total > 0) {
          setTotalPages(Math.ceil(res.data.frequencia.total / 10));
          setTotalRows(res.data.frequencia.total);
        }
        setPresencaList(res.data.frequencia.frequencias);
      })
      .catch((err) => {
        showNotification({
          message:
            err?.response?.data?.message ??
            "Erro ao carregar a lista de Presenças.",
          type: "error",
        });
      });
  }

  useEffect(() => {
    getPresencasList();
  }, [page]);

  return (
    <>
      <Box
        display={"flex"}
        gap={2}
      >
        <TableContainer component={Paper}>
          <Table id={"participante-table"}>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <b>Evento</b>
                </TableCell>
                <TableCell align="center">
                  <b>Participante</b>
                </TableCell>
                <TableCell align="center">
                  <b>Data</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {frequenciaList != null
                ? frequenciaList.map((frequencia: frequencia) => (
                    <TableRow key={frequencia.frequencia_id}>
                      <TableCell align="center">
                        {frequencia.inscricao_evento?.evento?.ano} -{" "}
                        {frequencia.inscricao_evento?.evento?.tema}
                      </TableCell>
                      <TableCell align="center">
                        {frequencia.inscricao_evento?.participante?.nome}
                      </TableCell>
                      <TableCell align="center">
                        {new Date(frequencia.data ?? "").toLocaleDateString(
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
    </>
  );
}
