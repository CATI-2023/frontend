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
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ptBR from "date-fns/locale/pt-BR";
import { evento, minicurso, participante } from "../../../../Types/type";
import { postMiniCurso, putMiniCurso } from "../../../../services/miniCursos";
import useNotification from "../../../../hooks/useNotification";
import { getEventos } from "../../../../services/evento";
import { getParticipantes } from "../../../../services/participantes";

interface props {
  open: boolean;
  onClose: () => void;
  Data?: minicurso | null;
}

export function DialogActionMiniCursos({ open, onClose, Data }: props) {
  const [minicurso, setMinicurso] = useState<minicurso>({
    data: "",
    descricao: "",
    evento_id_reference: 0,
    ministrante_participante_id_reference: 0,
    titulo: "",
    valor: 0,
    qtde_vagas: 0,
    evento: {
      evento_id: 0,
      ano: 0,
      tema: "",
      data_inicio: "",
      data_fim: "",
      qtde_vagas: 0,
      banner: "",
      valor: 0,
    },
    ministrante: {
      participante_id: 0,
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
      organizacao: false,
    },
  });

  const [eventos, setEventos] = useState<evento[]>([]);
  const [ministrantes, setMinistrantes] = useState<participante[]>([]);

  const [ministranteSelected, setMinistranteSeletected] = useState<
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

  async function getMinistrantesList() {
    await getParticipantes(0, "")
      .then((res) => {
        setMinistrantes(res.data.participantes.participantes);
      })
      .catch((err) =>
        showNotification({
          type: "error",
          message:
            "Erro obter lista de ministrantes. " + err?.response?.data?.message,
          title: "Erro ao obter lista",
        })
      );
  }

  const showNotification = useNotification();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data_ = {
      data: minicurso.data,
      descricao: minicurso.descricao,
      ministrante_participante_id_reference:
        ministranteSelected?.participante_id,
      titulo: minicurso.titulo,
      valor: Number(minicurso.valor),
      qtde_vagas: minicurso.qtde_vagas,
      evento_id_reference: eventoSelected?.evento_id,
    };

    if (Data) {
      if (eventoSelected != undefined && ministranteSelected != undefined) {
        await putMiniCurso(Data.minicurso_id, data_)
          .then(() => {
            showNotification({
              type: "success",
              title: "Sucesso ao editar o minicurso.",
              message: "Minicurso editado com sucesso.",
            });
            onClose();
            window.location.reload();
          })
          .catch((err) => {
            showNotification({
              type: "error",
              title: "Erro ao editar o minicurso.",
              message: "Minicurso não editado." + err?.response?.data?.message,
            });
          });
      } else {
        showNotification({
          type: "warning",
          message: "Selecione o evento e o ministrante.",
          title: "Evento ou Participante não selecionado",
        });
      }
    } else {
      postMiniCurso(data_)
        .then(() => {
          showNotification({
            type: "success",
            title: "Sucesso ao adicionar o minicurso.",
            message: "Minicurso adicionado com sucesso.",
          });
          onClose();
          window.location.reload();
        })
        .catch((err) => {
          showNotification({
            type: "error",
            title: "Erro ao adicionar o minicurso.",
            message:
              "Minicurso não adicionado. " + err?.response?.data?.message,
          });
        });
    }
  };

  useEffect(() => {
    if (Data) {
      setMinicurso(Data);
      setEventoSelected(Data?.evento);
      setMinistranteSeletected(Data?.ministrante);
    }
    getEvents();
    getMinistrantesList();
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
            {Data != null ? "Editar minicurso" : "Adicionar minicurso"}
          </DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            <form onSubmit={handleSubmit}>
              <Box display={"flex"} flexDirection={"column"} gap={2} py={2}>
                <TextField
                  required
                  size="small"
                  label="Título"
                  value={minicurso.titulo}
                  fullWidth
                  onChange={(event) => {
                    setMinicurso({
                      ...minicurso,
                      titulo: event?.target?.value,
                    });
                  }}
                />
                <TextField
                  required
                  size="small"
                  label="Descrição"
                  value={minicurso.descricao}
                  onChange={(event) => {
                    setMinicurso({
                      ...minicurso,
                      descricao: event?.target?.value,
                    });
                  }}
                  fullWidth
                />
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={ptBR}
                >
                  <DatePicker
                    label="Data"
                    views={["day", "month", "year"]}
                    value={new Date(minicurso.data)}
                    onChange={(event) => {
                      if (typeof event === "string") {
                        setMinicurso({ ...minicurso, data: event });
                      } else if (event instanceof Date) {
                        setMinicurso({
                          ...minicurso,
                          data: event.toISOString(),
                        });
                      }
                    }}
                  />
                </LocalizationProvider>
                {/* <TextField
                  fullWidth
                  label="Data"
                  value={minicurso.data.replace("Z", "")}
                  placeholder="Data"
                  required
                  type="datetime-local"
                  size="small"
                  onChange={(e) => {
                    setMinicurso({
                      ...minicurso,
                      data: e.target.value,
                    });
                  }}
                /> */}
                <TextField
                  required
                  size="small"
                  type="number"
                  label="Valor"
                  value={minicurso.valor}
                  fullWidth
                  onChange={(event) => {
                    setMinicurso({
                      ...minicurso,
                      valor: parseFloat(event.target.value),
                    });
                  }}
                />
                <TextField
                  required
                  size="small"
                  type="number"
                  label="Qtde. Vagas"
                  value={minicurso.qtde_vagas}
                  onChange={(event) => {
                    setMinicurso({
                      ...minicurso,
                      qtde_vagas: Number(event.target.value),
                    });
                  }}
                  fullWidth
                />
                <FormControl>
                  <Autocomplete
                    value={Data ? minicurso?.ministrante : ministranteSelected}
                    disablePortal
                    readOnly={Data ? true : false}
                    fullWidth
                    size="small"
                    options={ministrantes}
                    getOptionLabel={(option: participante) => option.nome}
                    renderInput={(params) => (
                      <TextField {...params} label="Selecione o Ministrante" />
                    )}
                    onChange={(event: any, value: participante | null) => {
                      event.preventDefault();
                      setMinistranteSeletected(value ? value : undefined);
                    }}
                  />
                </FormControl>
                <FormControl>
                  <Autocomplete
                    value={Data ? minicurso?.evento : eventoSelected}
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
