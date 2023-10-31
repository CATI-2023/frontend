import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import { evento, frequencia, inscricaoEventoGet } from "../../../../Types/type";
import { useEffect, useState } from "react";
import useNotification from "../../../../hooks/useNotification";
import { getEventos } from "../../../../services/evento";
import { getInscricaoEventos } from "../../../../services/inscricaoEvento";
import {
  updateFrequencia,
  createFrequencia,
} from "../../../../services/frequencia";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ptBR from "date-fns/locale/pt-BR";

interface props {
  open: boolean;
  onClose: () => void;
  title: string;
  Data?: frequencia | null;
}

export function DialogActionsPresenca({ open, onClose, title, Data }: props) {
  const [presenca, setPresenca] = useState<frequencia>({
    data: "",
    inscricao_evento_id_reference: 0,
    inscricao_evento: undefined,
  });
  const [eventos, setEventos] = useState<evento[]>([]);
  const [inscricoesEvento, setInscricoesEvento] = useState<
    inscricaoEventoGet[]
  >([]);

  const [eventoSelected, setEventoSelected] = useState<evento | undefined>(
    undefined
  );
  const [inscricaoEventoSelected, setInscricaoEventoSeletected] = useState<
    inscricaoEventoGet | undefined
  >(undefined);

  const [openInscricaoList, setOpenInscricaoList] = useState<boolean>(false);
  const showNotification = useNotification();

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

  async function getParticipantesList() {
    await getInscricaoEventos(
      0,
      eventoSelected ? String(eventoSelected?.ano) : ""
    )
      .then((res) => {
        setInscricoesEvento(res.data.inscricaoEventos.inscricaoEventos);
      })
      .catch((err) =>
        showNotification({
          type: "error",
          message:
            "Erro obter lista de participantes. " +
            err?.response?.data?.message,
          title: "Erro ao obter lista",
        })
      );
  }

  async function UpdateFrequencia() {
    const data_ = {
      frequencia_id: presenca.frequencia_id,
      inscricao_evento_id_reference:
        inscricaoEventoSelected?.inscricao_evento_id,
      data: new Date(presenca?.data ?? "").toISOString(),
    };

    await updateFrequencia(Data?.frequencia_id, data_)
      .then(() => {
        showNotification({
          type: "success",
          message: "Frequência atualizada com sucesso.",
          title: "Sucesso ao atualizar",
        });
        window.location.reload();
      })
      .catch((err) =>
        showNotification({
          type: "error",
          message:
            "Erro ao atualizar frequência. " + err?.response?.data?.message,
          title: "Erro ao atualizar",
        })
      );
    onClose();
  }

  async function CreateFrequencia() {
    const data_ = {
      inscricao_evento_id_reference:
        inscricaoEventoSelected?.inscricao_evento_id,
      data: new Date(presenca?.data ?? "").toISOString(),
    };
    if (inscricaoEventoSelected != undefined) {
      await createFrequencia(data_)
        .then(() => {
          showNotification({
            type: "success",
            message: "Frequência criada com sucesso.",
            title: "Sucesso ao criar",
          });
          window.location.reload();
        })
        .catch((err) => {
          showNotification({
            type: "error",
            message:
              "Erro ao cadastrar Frequência. " + err?.response?.data?.message,
            title: "Erro ao atualizar",
          });
        });
    } else {
      showNotification({
        type: "warning",
        message: "Selecione o participante.",
        title: "Participante não selecionado",
      });
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    Data ? UpdateFrequencia() : CreateFrequencia();
  };

  useEffect(() => {
    getEvents();
    getParticipantesList();
    if (Data) {
      setPresenca(Data);
      setInscricaoEventoSeletected(Data?.inscricao_evento ?? undefined);
      setEventoSelected(Data?.inscricao_evento?.evento ?? undefined);
    }
    if (openInscricaoList) {
      getParticipantesList();
    } else {
      setInscricoesEvento([]);
    }
  }, [Data, openInscricaoList]);

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <Box
          width={{ sm: "340px", md: "480px", lg: "600" }}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <DialogTitle>
            {!Data ? `Adicionar ${title}` : `Editar ${title}`}
          </DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            <form onSubmit={handleSubmit}>
              <Box display={"flex"} flexDirection={"column"} gap={2} py={2}>
                {Data ? (
                  <>
                    <FormControl>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={1}
                        marginBottom={"1rem"}
                      >
                        <Avatar
                          src={inscricaoEventoSelected?.participante?.foto}
                          variant="rounded"
                          sx={{
                            objectFit: "contain",
                            width: 250,
                            height: 250,
                          }}
                        />
                      </Box>
                      <TextField
                        fullWidth
                        placeholder="Evento"
                        label="Evento"
                        required
                        value={
                          inscricaoEventoSelected?.evento?.ano +
                          " - " +
                          inscricaoEventoSelected?.evento?.tema
                        }
                        size="small"
                      />
                    </FormControl>
                    <FormControl>
                      <TextField
                        fullWidth
                        placeholder="Participante"
                        label="Participante"
                        value={inscricaoEventoSelected?.participante?.nome}
                        size="small"
                      />
                    </FormControl>
                  </>
                ) : (
                  <>
                    <FormControl>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={1}
                        marginBottom={"1rem"}
                      >
                        <Avatar
                          src={inscricaoEventoSelected?.participante?.foto}
                          variant="rounded"
                          sx={{
                            objectFit: "contain",
                            width: 250,
                            height: 250,
                          }}
                        />
                      </Box>
                    </FormControl>
                    <FormControl>
                      <Autocomplete
                        value={eventoSelected}
                        disablePortal
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
                          setInscricaoEventoSeletected(undefined);
                          getParticipantesList();
                        }}
                      />
                    </FormControl>
                    <FormControl>
                      <Autocomplete
                        value={inscricaoEventoSelected}
                        disablePortal
                        fullWidth
                        size="small"
                        options={inscricoesEvento}
                        getOptionLabel={(option: inscricaoEventoGet) =>
                          option.participante?.nome + " - " + option.evento?.ano
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Selecione o participante"
                          />
                        )}
                        onChange={(
                          event: any,
                          value: inscricaoEventoGet | null
                        ) => {
                          event.preventDefault();
                          setInscricaoEventoSeletected(
                            value ? value : undefined
                          );
                        }}
                        open={openInscricaoList}
                        onOpen={() => {
                          setOpenInscricaoList(true);
                        }}
                        onClose={() => {
                          setOpenInscricaoList(false);
                        }}
                      />
                    </FormControl>
                  </>
                )}
                <FormControl>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={ptBR}
                  >
                    <DateTimePicker
                      label="Data"
                      views={["day", "month", "year", "hours", "minutes"]}
                      timezone="America/Cuiaba"
                      defaultValue={new Date()}
                      value={new Date(presenca.data ?? "")}
                      onChange={(event) => {
                        if (typeof event === "string") {
                          setPresenca({ ...presenca, data: event });
                        } else if (event instanceof Date) {
                          setPresenca({
                            ...presenca,
                            data: event.toISOString(),
                          });
                        }
                      }}
                    />
                  </LocalizationProvider>
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
