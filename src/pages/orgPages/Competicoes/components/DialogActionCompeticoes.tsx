import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ptBR from "date-fns/locale/pt-BR";
import { competicao } from "../../../../Types/type";
import {
  postCompeticao,
  putCompeticao,
} from "../../../../services/competicoes";
import useNotification from "../../../../hooks/useNotification";
import { Camera, File, FilePdf, Trash } from "@phosphor-icons/react";

interface props {
  open: boolean;
  onClose: () => void;
  Data?: competicao | null;
}

export function DialogActionCompeticoes({ open, onClose, Data }: props) {
  const [regulamentoNameFile, setRegulamentoNameFile] = useState<string>("");
  const [tabelaJogosNameFile, setTabelaJogosNameFile] = useState<string>("");
  const [bannerBase64, setBannerBase64] = useState<string>("");

  const apiHostBase = import.meta.env.VITE_API_URL as string;

  const [competicao, setCompeticao] = useState<competicao>({
    competicao_id: 0,
    descricao: "",
    titulo: "",
    qtde_membros_equipe: 0,
    inscricao_data_inicio: "",
    inscricao_data_fim: "",
    valor_inscricao: 0,
    regulamento: "",
    banner: "",
    tabela_jogos: "",
    regulamento_pdfFile: null,
    banner_pictureFile: null,
    tabelaJogos_pdfFile: null,
  });

  const showNotification = useNotification();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      competicao.inscricao_data_inicio === "" ||
      competicao.inscricao_data_fim === ""
    ) {
      showNotification({
        type: "warning",
        message: "Informe corretamente o período de inscrição.",
        title: "Período de inscrição não informado.",
      });
      return;
    }

    if (competicao.banner === "" && competicao.banner_pictureFile === null) {
      showNotification({
        type: "warning",
        message: "Selecione o Banner da Competição.",
        title: "Banner não selecionado",
      });
      return;
    }

    if (
      competicao.regulamento === "" &&
      competicao.regulamento_pdfFile === null
    ) {
      showNotification({
        type: "warning",
        message: "Selecione o Regulamento da Competição.",
        title: "Regulamento não selecionado",
      });
      return;
    }

    const data_ = {
      descricao: competicao.descricao,
      titulo: competicao.titulo,
      qtde_membros_equipe: competicao.qtde_membros_equipe,
      inscricao_data_inicio: competicao.inscricao_data_inicio,
      inscricao_data_fim: competicao.inscricao_data_fim,
      valor_inscricao: competicao.valor_inscricao,
      regulamento: competicao.regulamento,
      banner: competicao.banner,
      tabela_jogos: competicao.tabela_jogos,
      regulamento_pdfFile: competicao.regulamento_pdfFile,
      banner_pictureFile: competicao.banner_pictureFile,
      tabelaJogos_pdfFile: competicao.tabelaJogos_pdfFile,
    };

    if (Data) {
      await putCompeticao(Data.competicao_id, data_)
        .then(() => {
          showNotification({
            type: "success",
            title: "Sucesso ao editar a Competição.",
            message: "Competição editada com sucesso.",
          });
          onClose();
          window.location.reload();
        })
        .catch((err) => {
          showNotification({
            type: "error",
            title: "Erro ao editar a Competição.",
            message: "Competição não editada. " + err?.response?.data?.message,
          });
        });
    } else {
      postCompeticao(data_)
        .then(() => {
          showNotification({
            type: "success",
            title: "Sucesso ao adicionar a Competição.",
            message: "Competição adicionada com sucesso.",
          });
          onClose();
          window.location.reload();
        })
        .catch((err) => {
          showNotification({
            type: "error",
            title: "Erro ao adicionar a Competição.",
            message:
              "Competição não adicionada. " + err?.response?.data?.message,
          });
        });
    }
  };

  const handleImageUploadBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showNotification({
          type: "warning",
          message: "Tamanho máximo suportado é 10mb.",
          title: "Tamanho de arquivo não suportado",
        });
        return;
      } else {
        setCompeticao((prev) => ({
          ...prev,
          banner_pictureFile: file,
        }));
        let reader = new FileReader();
        reader.onload = () => {
          setBannerBase64(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleImageUploadRegulamento = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showNotification({
          type: "warning",
          message: "Tamanho máximo suportado é 10mb.",
          title: "Tamanho de arquivo não suportado",
        });
        return;
      } else {
        setCompeticao((prev) => ({
          ...prev,
          regulamento_pdfFile: file,
        }));
        setRegulamentoNameFile(file.name);
      }
    }
  };

  const handlePDFUploadTabelaJogos = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showNotification({
          type: "warning",
          message: "Tamanho máximo suportado é 10mb.",
          title: "Tamanho de arquivo não suportado",
        });
        return;
      } else {
        setCompeticao((prev) => ({
          ...prev,
          tabelaJogos_pdfFile: file,
        }));
        setTabelaJogosNameFile(file.name);
      }
    }
  };

  useEffect(() => {
    if (Data) {
      setCompeticao(Data);
      setBannerBase64(apiHostBase + "/download?file=" + Data.banner);
      setRegulamentoNameFile(
        "Regulamento-" +
          Data.titulo.replace(/\./g, "-").replace(/ /g, "_") +
          ".pdf"
      );
      if (Data.tabela_jogos !== "")
        setTabelaJogosNameFile(
          "Tabela_jogos-" +
            Data.titulo.replace(/\./g, "-").replace(/ /g, "_") +
            ".pdf"
        );
    }
  }, [Data]);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Box
          width={{ sm: "340px", md: "480px", lg: "600" }}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <DialogTitle sx={{ textAlign: "center" }}>
            {Data != null ? "Editar Competição" : "Adicionar Competição"}
          </DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1}
              >
                <Avatar
                  src={bannerBase64}
                  variant="rounded"
                  sx={{
                    objectFit: "contain",
                    width: 150,
                    height: 150,
                  }}
                />
                <Box display="flex" gap={1}>
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() => {
                      const input = document.getElementById(
                        "contained-button-file-banner"
                      );
                      input?.click();
                    }}
                  >
                    <Camera />
                  </Button>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="contained-button-file-banner"
                    type="file"
                    onChange={(event) => {
                      if (event.target.files) {
                        handleImageUploadBanner(event);
                      }
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setCompeticao((prev) => ({
                        ...prev,
                        banner: "",
                      }));
                    }}
                  >
                    <Trash />
                  </Button>
                </Box>
              </Box>
              <Box display={"flex"} flexDirection={"column"} gap={2} py={2}>
                <TextField
                  required
                  size="small"
                  label="Título"
                  value={competicao.titulo}
                  fullWidth
                  onChange={(event) => {
                    setCompeticao({
                      ...competicao,
                      titulo: event?.target?.value,
                    });
                  }}
                />
                <TextField
                  required
                  size="small"
                  label="Descrição"
                  value={competicao.descricao}
                  onChange={(event) => {
                    setCompeticao({
                      ...competicao,
                      descricao: event?.target?.value,
                    });
                  }}
                  fullWidth
                />
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={ptBR}
                >
                  <DateTimePicker
                    label="Início das Inscrições"
                    views={["day", "month", "year", "hours", "minutes"]}
                    timezone="America/Cuiaba"
                    defaultValue={new Date()}
                    value={new Date(competicao.inscricao_data_inicio ?? "")}
                    onChange={(event) => {
                      if (typeof event === "string") {
                        setCompeticao({
                          ...competicao,
                          inscricao_data_inicio: event,
                        });
                      } else if (event instanceof Date) {
                        setCompeticao({
                          ...competicao,
                          inscricao_data_inicio: event.toISOString(),
                        });
                      }
                    }}
                  />
                </LocalizationProvider>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={ptBR}
                >
                  <DateTimePicker
                    label="Fim das Inscrições"
                    views={["day", "month", "year", "hours", "minutes"]}
                    timezone="America/Cuiaba"
                    defaultValue={new Date()}
                    value={new Date(competicao.inscricao_data_fim ?? "")}
                    onChange={(event) => {
                      if (typeof event === "string") {
                        setCompeticao({
                          ...competicao,
                          inscricao_data_fim: event,
                        });
                      } else if (event instanceof Date) {
                        setCompeticao({
                          ...competicao,
                          inscricao_data_fim: event.toISOString(),
                        });
                      }
                    }}
                  />
                </LocalizationProvider>
                <Box
                  display={"flex"}
                  flexDirection={{ xs: "column", md: "row" }}
                  gap={2}
                >
                  <TextField
                    required
                    size="small"
                    label="Qtde de membros por Equipe"
                    value={competicao.qtde_membros_equipe}
                    type="number"
                    onChange={(event) => {
                      setCompeticao({
                        ...competicao,
                        qtde_membros_equipe: Number(event?.target?.value),
                      });
                    }}
                    fullWidth
                  />
                  <TextField
                    required
                    type="number"
                    size="small"
                    label="Valor de Inscrição"
                    value={competicao.valor_inscricao}
                    onChange={(event) => {
                      setCompeticao({
                        ...competicao,
                        valor_inscricao: Number(event?.target?.value),
                      });
                    }}
                    fullWidth
                  />
                </Box>
              </Box>
              <Divider
                sx={{ my: 1, fontSize: "0.675rem", color: "text.secondary" }}
                textAlign="left"
              >
                Regulamento
              </Divider>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1}
                mb="1rem"
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="stretch"
                  gap={1}
                  mb="1rem"
                >
                  <TextField
                    required
                    size="small"
                    label="Regulamento"
                    disabled
                    value={regulamentoNameFile}
                  />
                  {Data && Data.regulamento !== "" ? (
                    <>
                      <Button
                        color="primary"
                        onClick={() => {
                          window.open(
                            apiHostBase +
                              "/download?file=" +
                              competicao.regulamento
                          );
                        }}
                      >
                        <FilePdf /> {"Abrir PDF"}
                      </Button>
                    </>
                  ) : null}
                </Box>
                <Box display="flex" gap={1}>
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() => {
                      const input = document.getElementById(
                        "contained-button-file-regulamento"
                      );
                      input?.click();
                    }}
                  >
                    <File />
                  </Button>
                  <input
                    accept="application/pdf"
                    style={{ display: "none" }}
                    id="contained-button-file-regulamento"
                    type="file"
                    onChange={(event) => {
                      if (event.target.files) {
                        handleImageUploadRegulamento(event);
                      }
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setCompeticao((prev) => ({
                        ...prev,
                        regulamento: "",
                      }));
                    }}
                  >
                    <Trash />
                  </Button>
                </Box>
              </Box>
              <Divider
                sx={{ my: 1, fontSize: "0.675rem", color: "text.secondary" }}
                textAlign="left"
              >
                Tabela de Jogos
              </Divider>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1}
                mb="1rem"
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="stretch"
                  gap={1}
                  mb="1rem"
                >
                  <TextField
                    size="small"
                    label="Tabela de Jogos"
                    disabled
                    value={tabelaJogosNameFile}
                  />
                  {Data && Data.tabela_jogos !== "" ? (
                    <>
                      <Button
                        color="primary"
                        onClick={() => {
                          window.open(
                            apiHostBase +
                              "/download?file=" +
                              competicao.tabela_jogos
                          );
                        }}
                      >
                        <FilePdf /> {"Abrir PDF"}
                      </Button>
                    </>
                  ) : null}
                </Box>
                <Box display="flex" gap={1}>
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() => {
                      const input = document.getElementById(
                        "contained-button-file-tabela-jogos"
                      );
                      input?.click();
                    }}
                  >
                    <File />
                  </Button>
                  <input
                    accept="application/pdf"
                    style={{ display: "none" }}
                    id="contained-button-file-tabela-jogos"
                    type="file"
                    onChange={(event) => {
                      if (event.target.files) {
                        handlePDFUploadTabelaJogos(event);
                      }
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setCompeticao((prev) => ({
                        ...prev,
                        tabela_jogos: "",
                      }));
                    }}
                  >
                    <Trash />
                  </Button>
                </Box>
              </Box>
              <DialogActions>
                <Box
                  display={"flex"}
                  gap={2}
                  width={"100%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Button variant="contained" color="error" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button variant="contained" color="success" type="submit">
                    Salvar
                  </Button>
                </Box>
              </DialogActions>
            </form>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
}
