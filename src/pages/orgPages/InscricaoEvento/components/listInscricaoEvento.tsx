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
import { inscricaoEventoGet } from "../../../../Types/type";
import { DefaultsIcons } from "../../../../constants/DefaultIcons";
import { DialogActionsInscricoesEvento } from "./DialogAction";
import { useState, useEffect } from "react";
import {
  getInscricaoEventos,
  deleteInscricaoEvento,
} from "../../../../services/inscricaoEvento";
import useNotification from "../../../../hooks/useNotification";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import BannerCati from "../../../../assets/BANNER-CATI-23.png";

export function ListaInscricaoEvento() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
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
        if (res.data.inscricaoEventos.total > 0) {
          setTotalPages(Math.floor(res.data.inscricaoEventos.total / 10));
          setTotalRows(res.data.inscricaoEventos.total);
        }
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

  const ListaPDF = () => {
    var doc = new jsPDF("p", "pt", "letter");

    var body = [
      ["Evento", "Participante - CPF", "Participante - Nome", "Pagamento"],
    ];

    inscricaoEventoList?.forEach((i) => {
      let list = [];
      list.push(i.evento?.ano + " - " + i.evento?.tema);
      list.push(i.participante?.cpf + "");
      list.push(i.participante?.nome + "");
      list.push(i.pagamento?.status + "");
      body.push(list);
    });

    doc.setLineWidth(2);
    doc.addImage(BannerCati, "png", 20, 20, 570, 70, "bannerCati", "NONE", 0);
    doc.text("Lista de Inscrições", 230, 120);
    doc.setFontSize(12);
    doc.text("Total de registros: " + totalRows, 40, 140);
    autoTable(doc, {
      body: body,
      startY: 150,
      theme: "grid",
    });

    // doc.save('lista.pdf');
    window.open(doc.output("bloburl"));
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
        <Box display={"flex"} flexDirection={"row"} alignItems={"end"} gap={2}>
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
      <DialogActionsInscricoesEvento
        Data={selectedInscricaoEvento}
        open={open}
        onClose={handleClose}
        title="Inscrição"
      />
    </>
  );
}
