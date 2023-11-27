import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import {
  LocalizationProvider,
  DateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ptBR from "date-fns/locale/pt-BR";
import { evento, palestra, participante } from "../../../../Types/type";
import { postPalestra, putPalestra } from "../../../../services/palestras";
import useNotification from "../../../../hooks/useNotification";
import { getEventos } from "../../../../services/evento";
import { getParticipantes } from "../../../../services/participantes";

interface props {
  open: boolean;
  onClose: () => void;
  Data?: palestra | null;
}

export function DialogActionPalestras({ open, onClose, Data }: props) {
  const [palestra, setPalestra] = useState<palestra>({
    palestra_id: 0,
    atuacao_palestrante: "",
    lattes_palestrante: "",
    data: "",
    descricao: "",
    evento_id_reference: 0,
    participante_id_reference: 0,
    tema: "",
    evento: {
      evento_id: 0,
      ano: 0,
      tema: "",
      data_inicio: "",
      data_fim: "",
      qtde_vagas: 0,
      banner_base64: "",
      valor: 0,
    },
    palestrante: {
      participante_id: 0,
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
      organizacao: false,
    },
  });

  const [eventos, setEventos] = useState<evento[]>([]);
  const [palestrantes, setPalestrantes] = useState<participante[]>([]);

  const [palestranteSelected, setPalestranteSeletected] = useState<
    participante | undefined
  >(undefined);

  const [eventoSelected, setEventoSelected] = useState<evento | undefined>(
    undefined
  );

  async function getEvents() {
    await getEventos(0, "*")
      .then((res) => {
        setEventos(res.data.eventos.eventos);
      })
      .catch((err) =>
        showNotification({
          type: "error",
          message:
            "Erro obter lista de eventos. " + err?.response?.data?.message,
          title: "Erro ao obter lista",
        })
      );
  }

  async function getPalestrantesList() {
    await getParticipantes(0, "")
      .then((res) => {
        setPalestrantes(res.data.participantes.participantes);
      })
      .catch((err) =>
        showNotification({
          type: "error",
          message:
            "Erro obter lista de palestrantes. " + err?.response?.data?.message,
          title: "Erro ao obter lista",
        })
      );
  }

  const showNotification = useNotification();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data_ = {
      data: palestra.data,
      atuacao_palestrante: palestra.atuacao_palestrante,
      lattes_palestrante: palestra.lattes_palestrante,
      descricao: palestra.descricao,
      participante_id_reference: palestranteSelected?.participante_id,
      tema: palestra.tema,
      evento_id_reference: eventoSelected?.evento_id,
    };

    if (eventoSelected === undefined || palestranteSelected === undefined) {
      showNotification({
        type: "warning",
        message: "Selecione o evento e o palestrante.",
        title: "Evento ou Palestrante não selecionado",
      });
      return;
    }

    if (palestra.data === "") {
      showNotification({
        type: "warning",
        message: "Informe a data da palestra.",
        title: "Data não informada.",
      });
      return;
    }

    if (Data) {
      if (eventoSelected != undefined && palestranteSelected != undefined) {
        await putPalestra(Data.palestra_id, data_)
          .then(() => {
            showNotification({
              type: "success",
              title: "Sucesso ao editar a Palestra.",
              message: "Palestra editada com sucesso.",
            });
            onClose();
            window.location.reload();
          })
          .catch((err) => {
            showNotification({
              type: "error",
              title: "Erro ao editar a Palestra.",
              message: "Palestra não editada. " + err?.response?.data?.message,
            });
          });
      } else {
        showNotification({
          type: "warning",
          message: "Selecione o evento e o palestrante.",
          title: "Evento ou Palestrante não selecionado",
        });
      }
    } else {
      postPalestra(data_)
        .then(() => {
          showNotification({
            type: "success",
            title: "Sucesso ao adicionar a Palestra.",
            message: "Palestra adicionada com sucesso.",
          });
          onClose();
          window.location.reload();
        })
        .catch((err) => {
          showNotification({
            type: "error",
            title: "Erro ao adicionar a Palestra.",
            message: "Palestra não adicionada. " + err?.response?.data?.message,
          });
        });
    }
  };

  useEffect(() => {
    if (Data) {
      setPalestra(Data);
      setEventoSelected(Data?.evento);
      setPalestranteSeletected(Data?.palestrante);
    }
    getEvents();
    getPalestrantesList();
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
            {Data != null ? "Editar Palestra" : "Adicionar Palestra"}
          </DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            <form onSubmit={handleSubmit}>
              <Box display={"flex"} flexDirection={"column"} gap={2} py={2}>
                <FormControl>
                  <Autocomplete
                    value={Data ? palestra?.evento : eventoSelected}
                    disablePortal
                    readOnly={Data ? true : false}
                    fullWidth
                    size="small"
                    options={eventos}
                    getOptionLabel={(option: evento) =>
                      option.ano + " - " + option.tema
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Selecione o evento" />
                    )}
                    onChange={(event: any, value: evento | null) => {
                      event.preventDefault();
                      setEventoSelected(value ? value : undefined);
                    }}
                  />
                </FormControl>
                <TextField
                  required
                  size="small"
                  label="Tema"
                  value={palestra.tema}
                  fullWidth
                  onChange={(event) => {
                    setPalestra({
                      ...palestra,
                      tema: event?.target?.value,
                    });
                  }}
                />
                <TextField
                  required
                  size="small"
                  label="Descrição"
                  value={palestra.descricao}
                  onChange={(event) => {
                    setPalestra({
                      ...palestra,
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
                    label="Data"
                    views={["day", "month", "year", "hours", "minutes"]}
                    timezone="America/Cuiaba"
                    defaultValue={new Date()}
                    value={new Date(palestra.data ?? "")}
                    onChange={(event) => {
                      if (typeof event === "string") {
                        setPalestra({ ...palestra, data: event });
                      } else if (event instanceof Date) {
                        setPalestra({
                          ...palestra,
                          data: event.toISOString(),
                        });
                      }
                    }}
                  />
                </LocalizationProvider>
                <FormControl>
                  <Autocomplete
                    value={Data ? palestra?.palestrante : palestranteSelected}
                    disablePortal
                    readOnly={Data ? true : false}
                    fullWidth
                    size="small"
                    options={palestrantes}
                    getOptionLabel={(option: participante) => option.nome}
                    renderInput={(params) => (
                      <TextField {...params} label="Selecione o Ministrante" />
                    )}
                    onChange={(event: any, value: participante | null) => {
                      event.preventDefault();
                      setPalestranteSeletected(value ? value : undefined);
                    }}
                  />
                </FormControl>
                <TextField
                  required
                  size="small"
                  label="Atuação do Palestrante"
                  value={palestra.atuacao_palestrante}
                  onChange={(event) => {
                    setPalestra({
                      ...palestra,
                      atuacao_palestrante: event?.target?.value,
                    });
                  }}
                  fullWidth
                />
                <TextField
                  required
                  type="url"
                  size="small"
                  label="Currículo Lattes"
                  value={palestra.lattes_palestrante}
                  onChange={(event) => {
                    setPalestra({
                      ...palestra,
                      lattes_palestrante: event?.target?.value,
                    });
                  }}
                  fullWidth
                />
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
