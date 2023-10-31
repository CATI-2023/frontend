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
import QRCode from "qrcode";

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
          setTotalPages(Math.ceil(res.data.inscricaoEventos.total / 10));
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

    getInscricaoEventos(0, busca)
      .then((res) => {
        if (res.data.inscricaoEventos.total > 0) {
          setTotalRows(res.data.inscricaoEventos.total);
          var listaInscricoes: inscricaoEventoGet[] =
            res.data.inscricaoEventos.inscricaoEventos;
          listaInscricoes.forEach((i) => {
            let list = [];
            list.push(i.evento?.ano + " - " + i.evento?.tema);
            list.push(i.participante?.cpf + "");
            list.push(i.participante?.nome + "");
            list.push(i.pagamento?.status + "");
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
          doc.text("Lista de Inscrições", 230, 120);
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
            message: "Nenhuma inscrição encontrada.",
            type: "warning",
          });
        }
      })
      .catch((err) => {
        showNotification({
          message:
            err?.response?.data?.message ??
            "Erro ao carregar a lista de Inscições de Eventos.",
          type: "error",
        });
      });
  };

  type Cracha = {
    inscricao_evento_id: number | undefined;
    participante_nome: string | undefined;
    qrcode: string;
  };

  async function getQrCodes(list: inscricaoEventoGet[]) {
    var listCracha: Cracha[] = [];
    list.forEach((i) => {
      var c: Cracha = {
        inscricao_evento_id: i.inscricao_evento_id,
        participante_nome: i.participante?.nome,
        qrcode: "",
      };
      QRCode.toDataURL("cati2023-participante-" + i.inscricao_evento_id).then(
        (url) => {
          c.qrcode = url;
          listCracha.push(c);
        }
      );
    });
    return listCracha;
  }

  const ListaCrachasPDF = () => {
    var doc = new jsPDF("p", "pt", "letter");

    getInscricaoEventos(0, busca)
      .then((res) => {
        if (res.data.inscricaoEventos.total > 0) {
          setTotalRows(res.data.inscricaoEventos.total);
          var listaInscricoes: inscricaoEventoGet[] =
            res.data.inscricaoEventos.inscricaoEventos;
          doc.setLineWidth(2);
          doc.addImage(
            BannerCati,
            "PNG",
            20,
            20,
            570,
            70,
            "bannerCati",
            "NONE",
            0
          );
          doc.text("Lista de Inscrições", 230, 120);
          doc.setFontSize(12);
          doc.text("Total de registros: " + totalRows, 40, 140);
          getQrCodes(listaInscricoes)
            .then((l) => {
              l.forEach((i) => {
                doc.addPage();
                doc.text("Participante: " + i.participante_nome, 230, 120);
                doc.text("Inscrição: " + i.inscricao_evento_id, 230, 150);
                var width = doc.internal.pageSize.getWidth() / 2;
                var height = doc.internal.pageSize.getHeight() / 2;
                var img = new Image();
                img.src = i.qrcode;
                doc.addImage(
                  img,
                  "PNG",
                  width / 2,
                  height / 2,
                  width,
                  height,
                  "qrCode",
                  "NONE",
                  0
                );
              });
              window.open(doc.output("bloburl"));
            })
            .catch(() => {
              showNotification({
                message: "Erro ao carregar lista de crachás.",
                type: "error",
              });
              window.location.reload();
            });
        } else {
          showNotification({
            message: "Nenhuma inscrição encontrada.",
            type: "warning",
          });
        }
      })
      .catch((err) => {
        showNotification({
          message:
            err?.response?.data?.message ??
            "Erro ao carregar a lista de Inscições de Eventos.",
          type: "error",
        });
      });
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
            message:
              "Erro ao remover inscrição. " + err?.response?.data?.message,
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
            <DefaultsIcons.AdicionarIcon size={26} />
            Adicionar Inscrição
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
          <Button
            variant="contained"
            sx={{ display: "flex", gap: 2 }}
            onClick={() => {
              ListaCrachasPDF();
            }}
            color="info"
          >
            <DefaultsIcons.CrachasIcon size={26} />
            Exportar Lista de Crachás
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
      <DialogActionsInscricoesEvento
        Data={selectedInscricaoEvento}
        open={open}
        onClose={handleClose}
        title="Inscrição"
      />
    </>
  );
}
