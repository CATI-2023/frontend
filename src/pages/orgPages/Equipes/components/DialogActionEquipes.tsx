import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { competicao, equipe } from "../../../../Types/type";
import { postEquipe, putEquipe } from "../../../../services/equipes";
import { getCompeticoesOpen } from "../../../../services/competicoes";
import useNotification from "../../../../hooks/useNotification";

interface props {
  open: boolean;
  onClose: () => void;
  Data?: equipe | null;
}

type Status = "APROVADO" | "PENDENTE" | "RECUSADO";

export function DialogActionEquipes({ open, onClose, Data }: props) {
  const [competicoes, setCompeticoes] = useState<competicao[]>([]);
  const [statusPagamento, setStatusPagamento] = useState<Status>("PENDENTE");
  const [competicaoSelected, setCompeticaoSelected] = useState<
    competicao | undefined
  >(undefined);
  const [openDialogComprovante, setOpenDialogComprovante] = useState(false);
  const [equipe, setEquipe] = useState<equipe>({
    nome: "",
  });
  const apiHostBase = import.meta.env.VITE_API_URL as string;
  const showNotification = useNotification();

  const handleClose = () => {
    setOpenDialogComprovante(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data_ = {
      nome: equipe.nome,
      competicao_id_reference: competicaoSelected?.competicao_id,
      pagamento_id_reference: equipe.pagamento_id_reference || 0,
      pagamento: {
        status: statusPagamento,
        comprovante: Data?.pagamento?.comprovante || "",
      },
    };
    if (competicaoSelected != undefined) {
      if (Data) {
        await putEquipe(Data.equipe_id, data_)
          .then(() => {
            showNotification({
              type: "success",
              title: "Sucesso ao editar Equipe.",
              message: "Equipe editada com sucesso.",
            });
            onClose();
            window.location.reload();
          })
          .catch((err) => {
            showNotification({
              type: "error",
              title: "Erro ao editar a Equipe.",
              message: "Equipe não editada. " + err?.response?.data?.message,
            });
          });
      } else {
        postEquipe(data_)
          .then(() => {
            showNotification({
              type: "success",
              title: "Sucesso ao adicionar a Equipe.",
              message: "Equipe adicionada com sucesso.",
            });
            onClose();
            window.location.reload();
          })
          .catch((err) => {
            showNotification({
              type: "error",
              title: "Erro ao adicionar a Equipe.",
              message: "Equipe não adicionada. " + err?.response?.data?.message,
            });
          });
      }
    } else {
      showNotification({
        type: "warning",
        message: "Selecione a competição.",
        title: "Competição não selecionada.",
      });
    }
  };

  async function getCompeticaoList() {
    await getCompeticoesOpen()
      .then((res) => {
        setCompeticoes(res.competicoes);
      })
      .catch((err) => {
        showNotification({
          type: "error",
          message:
            "Erro obter lista de competições. " + err?.response?.data?.message,
          title: "Erro ao obter lista",
        });
      });
  }

  useEffect(() => {
    if (Data) {
      setEquipe(Data);
      setCompeticaoSelected(Data?.competicao);
      setStatusPagamento(Data?.pagamento?.status as Status);
    }
    getCompeticaoList();
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
        >
          <DialogTitle>
            {!Data ? `Adicionar Equipe` : `Editar Equipe`}
          </DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            <form onSubmit={handleSubmit}>
              <Box display={"flex"} flexDirection={"column"} gap={2} py={2}>
                <FormControl>
                  <Autocomplete
                    value={Data ? equipe?.competicao : competicaoSelected}
                    disablePortal
                    readOnly={Data ? true : false}
                    fullWidth
                    size="small"
                    options={competicoes}
                    getOptionLabel={(option: competicao) => option.titulo}
                    renderInput={(params) => (
                      <TextField {...params} label="Selecione a competição" />
                    )}
                    onChange={(event: any, value: competicao | null) => {
                      event.preventDefault();
                      setCompeticaoSelected(value ? value : undefined);
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel sx={{ fontSize: "14px" }}>Status</FormLabel>
                  <Select
                    required
                    size="small"
                    defaultValue={
                      Data ? equipe?.pagamento?.status : statusPagamento
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
                <Box display={"flex"} flexDirection={"column"} gap={2} py={2}>
                  <TextField
                    required
                    size="small"
                    label="Nome da Equipe"
                    value={equipe.nome}
                    fullWidth
                    onChange={(event) => {
                      setEquipe({
                        ...equipe,
                        nome: event?.target?.value,
                      });
                    }}
                  />
                </Box>
                {Data ? (
                  <>
                    <Divider
                      sx={{
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
                        src={
                          equipe?.pagamento?.comprovante &&
                          equipe?.pagamento?.comprovante !== ""
                            ? apiHostBase +
                              "/download?file=" +
                              equipe?.pagamento?.comprovante
                            : ""
                        }
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
              src={
                equipe?.pagamento?.comprovante &&
                equipe?.pagamento?.comprovante !== ""
                  ? apiHostBase +
                    "/download?file=" +
                    equipe?.pagamento?.comprovante
                  : ""
              }
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
