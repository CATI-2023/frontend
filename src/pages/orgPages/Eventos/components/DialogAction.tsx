import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { evento } from "../../../../Types/type";
import { useEffect, useState } from "react";
import { postEvento, putEvento } from "../../../../services/evento";
import useNotification from "../../../../hooks/useNotification";
import { Camera, Trash } from "@phosphor-icons/react";

interface props {
  open: boolean;
  onClose: () => void;
  title: string;
  Data?: evento | null;
}
export function DialogActionsEventos({ open, onClose, title, Data }: props) {
  // const [data: eventos] = useFetch<Evento>("evento")
  const [evento, setEvento] = useState<evento>({
    ano: undefined,
    tema: "",
    data_inicio: "",
    data_fim: "",
    qtde_vagas: undefined,
    banner_base64: "",
    valor: undefined,
    evento_id: undefined,
  });

  const showNotification = useNotification();
  async function UpdateEvento() {
    const data = {
      ano: evento?.ano,
      tema: evento.tema?.trim(),
      data_inicio: new Date(evento.data_inicio).toISOString(),
      data_fim: new Date(evento.data_fim).toISOString(),
      qtde_vagas: evento.qtde_vagas,
      banner_base64: evento.banner_base64,
      valor: evento.valor,
    };

    await putEvento(Data?.evento_id, data)
      .then(() => {
        showNotification({
          type: "success",
          message: "Evento atualizado com sucesso.",
          title: "Sucesso ao atualizar",
        });
        window.location.reload();
      })
      .catch((err) =>
        showNotification({
          type: "error",
          message: "Erro ao atualizar evento. " + err?.response?.data?.message,
          title: "Erro ao atualizar",
        })
      );
    onClose();
  }

  async function CreateEvento() {
    const data = {
      ano: evento?.ano,
      tema: evento.tema?.trim(),
      data_inicio: new Date(evento.data_inicio).toISOString(),
      data_fim: new Date(evento.data_fim).toISOString(),
      qtde_vagas: evento.qtde_vagas,
      banner_base64: evento.banner_base64,
      valor: evento.valor,
    };

    await postEvento(data)
      .then(() => {
        showNotification({
          type: "success",
          message: "Evento criado com sucesso.",
          title: "Sucesso ao criar",
        });
        window.location.reload();
      })
      .catch((err) => {
        showNotification({
          type: "error",
          message: "Erro ao criar vento. " + err?.response?.data?.message,
          title: "Erro ao criar",
        });
      });
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    Data ? UpdateEvento() : CreateEvento();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEvento((prev) => ({
          ...prev,
          banner_base64: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (Data) setEvento(Data);
  }, [Data]);

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DialogTitle>
            <b>{!Data ? `Adicionar ${title}` : `Editar ${title}`}</b>
          </DialogTitle>
          {/* <Card
            sx={{
              p: 4,
            }}
          > */}
          <DialogContent sx={{ width: "100%" }}>
            <form onSubmit={handleSubmit}>
              <Divider
                sx={{
                  mt: 2,
                  mb: 2,
                }}
              >
                Dados do Evento
              </Divider>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1}
              >
                <Avatar
                  src={evento.banner_base64}
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
                        "contained-button-file"
                      );
                      input?.click();
                    }}
                  >
                    <Camera />
                  </Button>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="contained-button-file"
                    type="file"
                    onChange={(event) => {
                      if (event.target.files) {
                        handleImageUpload(event);
                      }
                    }}
                  />

                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setEvento((prev) => ({
                        ...prev,
                        banner_base64: "",
                      }));
                    }}
                  >
                    <Trash />
                  </Button>
                </Box>
              </Box>

              <Box display="flex" flexDirection="column" gap={1} mt={2}>
                <TextField
                  fullWidth
                  placeholder="Ano"
                  label="Ano"
                  required
                  type="number"
                  value={evento.ano}
                  onChange={(e) => {
                    setEvento({
                      ...evento,
                      ano: Number(e.target.value),
                    });
                  }}
                  size="small"
                />
                <TextField
                  fullWidth
                  placeholder="Tema"
                  label="Tema"
                  required
                  value={evento.tema}
                  onChange={(e) => {
                    setEvento({
                      ...evento,
                      tema: e.target.value,
                    });
                  }}
                  size="small"
                />
                <Stack direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    label="Data de início"
                    value={evento.data_inicio.replace("Z", "")}
                    placeholder="Data de início"
                    required
                    type="datetime-local"
                    size="small"
                    onChange={(e) => {
                      setEvento({
                        ...evento,
                        data_inicio: e.target.value,
                      });
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Data de fim"
                    value={evento.data_fim.replace("Z", "")}
                    placeholder="Data de fim"
                    type="datetime-local"
                    required
                    size="small"
                    onChange={(e) => {
                      setEvento({
                        ...evento,
                        data_fim: e.target.value,
                      });
                    }}
                  />
                </Stack>
                <Stack direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    label="Quantidade de vagas"
                    value={evento.qtde_vagas}
                    placeholder="Quantidade de vagas"
                    type="number"
                    required
                    size="small"
                    onChange={(e) => {
                      setEvento({
                        ...evento,
                        qtde_vagas: Number(e.target.value),
                      });
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Valor de inscrição"
                    value={evento.valor}
                    placeholder="Valor de inscrição"
                    required
                    size="small"
                    onChange={(e) => {
                      setEvento({
                        ...evento,
                        valor: Number(e.target.value),
                      });
                    }}
                  />
                </Stack>
              </Box>
              <DialogActions>
                <Box
                  display={"flex"}
                  gap={2}
                  width={"100%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  marginTop={"1rem"}
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
            {/* </Card> */}
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
}
