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
import { frequencia } from "../../../../Types/type";
import { DefaultsIcons } from "../../../../constants/DefaultIcons";
import { DialogActionsPresenca } from "./DialogAction";
import { DialogActionsQRCode } from "./DialogActionQRCode";
import { useState, useEffect } from "react";
import {
  getFrequencias,
  deleteFrequencia,
} from "../../../../services/frequencia";
import useNotification from "../../../../hooks/useNotification";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import BannerCati from "../../../../assets/BANNER-CATI-23.png";

export function ListaPresencas() {
  const [open, setOpen] = useState(false);
  const [openQRCode, setOpenQRCode] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [busca, setBusca] = useState<string>("*");

  const [selectedPresenca, setSelectedPresenca] = useState<frequencia | null>(
    null
  );

  const showNotification = useNotification();

  const handleOpen = (frequencia: frequencia | null) => {
    setSelectedPresenca(frequencia);
    setOpen(true);
  };

  const handleOpenQRCode = () => {
    setOpenQRCode(true);
  };

  const [frequenciaList, setPresencaList] = useState<frequencia[] | null>(null);

  async function getPresencasList() {
    getFrequencias(page, busca)
      .then((res) => {
        if (res.data.frequencia.total > 0) {
          setTotalPages(Math.ceil(res.data.frequencia.total / 10));
          setTotalRows(res.data.frequencia.total);
        } else {
          setTotalRows(0);
          setTotalPages(0);
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
  }, [page, busca]);

  const handleClose = () => {
    setSelectedPresenca({
      data: "",
      inscricao_evento_id_reference: 0,
      inscricao_evento: undefined,
    });
    setOpen(false);
  };

  const handleCloseQRCode = () => {
    setSelectedPresenca({
      data: "",
      inscricao_evento_id_reference: 0,
      inscricao_evento: undefined,
    });
    setOpenQRCode(false);
  };

  const ListaPDF = () => {
    var doc = new jsPDF("p", "pt", "letter");

    var body = [["Evento", "Participante - Nome", "Data"]];

    getFrequencias(0, busca)
      .then((res) => {
        if (res.data.frequencia.total > 0) {
          setTotalRows(res.data.frequencia.total);
          var listaPresencas: frequencia[] = res.data.frequencia.frequencias;
          listaPresencas.forEach((i) => {
            let list = [];
            list.push(
              i.inscricao_evento?.evento?.ano +
                " - " +
                i.inscricao_evento?.evento?.tema
            );
            list.push(i.inscricao_evento?.participante?.nome + "");
            list.push(
              new Date(i.data ?? "").toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })
            );
            body.push(list);
          });

          doc.setLineWidth(2);
          doc.addImage(
            BannerCati,
            "png",
            20,
            20,
            570,
            70,
            "bannerCati",
            "NONE",
            0
          );
          doc.text("Lista de Frequência", 230, 120);
          doc.setFontSize(12);
          doc.text("Total de registros: " + totalRows, 40, 140);
          autoTable(doc, {
            body: body,
            startY: 150,
            theme: "grid",
          });

          window.open(doc.output("bloburl"));
        } else {
          showNotification({
            message: "Nenhuma presença encontrada.",
            type: "warning",
          });
        }
      })
      .catch((err) => {
        showNotification({
          message:
            err?.response?.data?.message ??
            "Erro ao carregar a lista de presenças.",
          type: "error",
        });
      });
  };

  const handleDeletePresenca = async (id_frequencia: number | undefined) => {
    if (id_frequencia != undefined) {
      await deleteFrequencia(id_frequencia)
        .then(() => {
          showNotification({
            message: "Presença removida com sucesso. ",
            type: "success",
            title: "Presença removida",
          });
        })
        .catch((err) => {
          showNotification({
            message:
              "Erro ao remover presença. " + err?.response?.data?.message,
            type: "error",
            title: "Presença não removida",
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
        alignItems={{ md: "end", xs: "center" }}
        gap={2}
      >
        <Box
          display={"flex"}
          flexDirection={{ md: "row", xs: "column" }}
          alignItems={{ md: "end", xs: "center" }}
          gap={2}
        >
          <Button
            variant="contained"
            sx={{ display: "flex", gap: 2 }}
            onClick={() => {
              setSelectedPresenca(null);
              handleOpen(null);
            }}
          >
            <DefaultsIcons.AdicionarIcon size={26} />
            Adicionar Presença
          </Button>
          <Button
            variant="contained"
            sx={{ display: "flex", gap: 2 }}
            onClick={() => {
              handleOpenQRCode();
            }}
          >
            <DefaultsIcons.PresencaIcon size={26} />
            Adicionar Presença QRCode
          </Button>
          <Button
            variant="contained"
            sx={{ display: "flex", gap: 2 }}
            onClick={() => {
              ListaPDF();
            }}
            color="secondary"
          >
            <DefaultsIcons.ExportPdfIcon size={26} />
            Exportar para PDF
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table id={"participante-table"}>
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
                  <b>Data</b>
                </TableCell>
                <TableCell align="center">
                  <b>Ações</b>
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
                      <TableCell align="center">
                        <IconButton
                          color="inherit"
                          onClick={() => {
                            handleOpen(frequencia);
                          }}
                        >
                          <DefaultsIcons.EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            handleDeletePresenca(frequencia?.frequencia_id);
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
      <DialogActionsPresenca
        Data={selectedPresenca}
        open={open}
        onClose={handleClose}
        title="Presença"
      />
      <DialogActionsQRCode
        openQRCode={openQRCode}
        onCloseQRCode={handleCloseQRCode}
      />
    </>
  );
}
