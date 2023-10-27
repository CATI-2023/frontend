import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  evento,
  inscricaoEventoGet,
  participante,
} from "../../../../Types/type";
import { useEffect, useState } from "react";
import useNotification from "../../../../hooks/useNotification";
import { getEventos } from "../../../../services/evento";
import { getParticipantes } from "../../../../services/participantes";
import {
  updateInscricaoEvento,
  createInscricaoEventoOrg,
} from "../../../../services/inscricaoEvento";

type Status = "APROVADO" | "PENDENTE" | "RECUSADO";
interface props {
  open: boolean;
  onClose: () => void;
  title: string;
  Data?: inscricaoEventoGet | null;
}

export function DialogActionsInscricoesEvento({
  open,
  onClose,
  title,
  Data,
}: props) {
  const [inscricaoEvento, setInscricaoEvento] = useState<inscricaoEventoGet>({
    observacoes: "",
    evento_id_reference: 0,
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
    participante_id_reference: 0,
    participante: {
      participante_id: 0,
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
      organizacao: false,
    },
    pagamento_id_reference: 0,
    pagamento: {
      pagamento_id: 0,
      status: "PENDENTE",
      comprovante_base64: "",
    },
  });
  const [eventos, setEventos] = useState<evento[]>([]);
  const [participantes, setParticipantes] = useState<participante[]>([]);
  const [statusPagamento, setStatusPagamento] = useState<Status>("PENDENTE");
  const [openDialogComprovante, setOpenDialogComprovante] = useState(false);

  const TAMANHOS_CAMISETA = ["PP", "P", "M", "G", "GG", "XG"];
  const [eventoSelected, setEventoSelected] = useState<evento | undefined>(
    undefined
  );
  const [participanteSelected, setParticipanteSeletected] = useState<
    participante | undefined
  >(undefined);

  const showNotification = useNotification();

  const handleClose = () => {
    setOpenDialogComprovante(false);
  };

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

  // const list: participanteOption[];

  async function getParticipantesList() {
    await getParticipantes(0, "")
      .then((res) => {
        setParticipantes(res.data.participantes.participantes);
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

  async function UpdateInscricaoEvento() {
    const data_ = {
      evento_id_reference: eventoSelected?.evento_id,
      participante_id_reference: participanteSelected?.participante_id,
      pagamento: {
        status: statusPagamento,
      },
      observacoes: inscricaoEvento?.observacoes,
    };
    
    await updateInscricaoEvento(Data?.inscricao_evento_id, data_)
      .then(() => {
        showNotification({
          type: "success",
          message: "Inscrição atualizada com sucesso.",
          title: "Sucesso ao atualizar",
        });
        window.location.reload();
      })
      .catch((err) =>
        showNotification({
          type: "error",
          message:
            "Erro ao atualizar inscrição. " + err?.response?.data?.message,
          title: "Erro ao atualizar",
        })
      );
    onClose();
  }

  async function CreateInscricaoEvento() {
    const data_ = {
      evento_id_reference: eventoSelected?.evento_id,
      participante_id_reference: participanteSelected?.participante_id,
      pagamento: {
        status: statusPagamento,
      },
      observacoes: inscricaoEvento?.observacoes,
    };
    if (eventoSelected != undefined && participanteSelected != undefined) {
      await createInscricaoEventoOrg(data_)
        .then(() => {
          showNotification({
            type: "success",
            message: "Inscrição criada com sucesso.",
            title: "Sucesso ao criar",
          });
          window.location.reload();
        })
        .catch((err) => {
          showNotification({
            type: "error",
            message:
              "Erro ao cadastrar Inscrição. " + err?.response?.data?.message,
            title: "Erro ao atualizar",
          });
        });
    } else {
      showNotification({
        type: "warning",
        message: "Selecione o evento e o participante.",
        title: "Evento ou Participante não selecionado",
      });
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    Data ? UpdateInscricaoEvento() : CreateInscricaoEvento();
  };

  useEffect(() => {
    if (Data) {
      setInscricaoEvento(Data);
      setEventoSelected(Data?.evento);
      setParticipanteSeletected(Data?.participante);
      setStatusPagamento(Data?.pagamento?.status as Status);
    }
    getEvents();
    getParticipantesList();
  }, [Data]);

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
                <FormControl>
                  <Autocomplete
                    value={
                      Data
                        ? inscricaoEvento?.participante
                        : participanteSelected
                    }
                    disablePortal
                    readOnly = {Data ? true : false}
                    fullWidth
                    size="small"
                    options={participantes}
                    getOptionLabel={(option: participante) => option.nome}
                    renderInput={(params) => (
                      <TextField {...params} label="Selecione o participante" />
                    )}
                    onChange={(event: any, value: participante | null) => {
                      event.preventDefault();
                      setParticipanteSeletected(value ? value : undefined);
                    }}
                  />
                </FormControl>
                <FormControl>
                  <Autocomplete
                    value={Data ? inscricaoEvento?.evento : eventoSelected}
                    disablePortal
                    readOnly = {Data ? true : false}
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
                <FormControl>
                  <FormLabel sx={{ fontSize: "14px" }}>Status</FormLabel>
                  <Select
                    required
                    size="small"
                    defaultValue={
                      Data
                        ? inscricaoEvento?.pagamento?.status
                        : statusPagamento
                    }
                    value={statusPagamento}
                    onChange={(e) => {
                      setStatusPagamento(e.target.value as Status);
                    }}
                  >
                    <MenuItem value={"APROVADO"}>Aprovado</MenuItem>
                    <MenuItem value={"PENDENTE"}>Pendente</MenuItem>
                    <MenuItem value={"RECUSADO"}>Recusado</MenuItem>
                  </Select>
                </FormControl>
                {Data ? (
                  <>
                    <Divider
                      sx={{
                        mt: 2,
                        mb: 2,
                      }}
                    >
                      Comprovante de pagamento
                    </Divider>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      gap={1}
                    >
                      <Avatar
                        onClick={() => {
                          {
                            setOpenDialogComprovante(true);
                          }
                        }}
                        src={inscricaoEvento?.pagamento?.comprovante_base64}
                        variant="rounded"
                        sx={{
                          objectFit: "contain",
                          width: 150,
                          height: 150,
                        }}
                      />
                    </Box>
                  </>
                ) : null}
                {Data ? (
                  <>
                    <Divider
                      sx={{
                        mt: 2,
                        mb: 2,
                      }}
                    >
                      Observações
                    </Divider>
                    <Typography>{inscricaoEvento.observacoes}</Typography>
                  </>
                ) : (
                  <>
                    <FormControl variant="standard" size="small">
                      <FormLabel>Tamanho da camiseta</FormLabel>
                      <FormGroup row>
                        {TAMANHOS_CAMISETA.map((tamanho) => {
                          return (
                            <FormControlLabel
                              key={tamanho}
                              control={
                                <Checkbox
                                  onChange={() =>
                                    setInscricaoEvento({
                                      ...inscricaoEvento,
                                      observacoes:
                                        "Tamanho de camiseta: " + tamanho,
                                    })
                                  }
                                  name={tamanho}
                                />
                              }
                              label={tamanho}
                            />
                          );
                        })}
                      </FormGroup>
                    </FormControl>
                  </>
                )}
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
      <Dialog open={openDialogComprovante} onClose={handleClose} maxWidth="xl">
        <DialogTitle>Comprovante de Pagamento</DialogTitle>
        <DialogContent sx={{ width: "100%" }}>
          {" "}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <Avatar
              src={inscricaoEvento?.pagamento?.comprovante_base64}
              variant="rounded"
              sx={{
                objectFit: "contain",
                width: 150,
                height: 150,
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
