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
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ptBR from "date-fns/locale/pt-BR";

interface props {
  open: boolean;
  onClose: () => void;
  title: string;
  Data?: evento | null;
}
export function DialogActionsEventos({ open, onClose, title, Data }: props) {
  const [evento, setEvento] = useState<evento>({
    ano: undefined,
    tema: "",
    data_inicio: "",
    data_fim: "",
    qtde_vagas: undefined,
    banner: "",
    valor: undefined,
    evento_id: undefined,
  });
  const [bannerBase64, setBannerBase64] = useState<string>("");
  const apiHostBase = import.meta.env.VITE_API_URL as string;

  const showNotification = useNotification();

  async function UpdateEvento() {
    const data = {
      ano: evento?.ano,
      tema: evento.tema?.trim(),
      data_inicio: new Date(evento.data_inicio).toISOString(),
      data_fim: new Date(evento.data_fim).toISOString(),
      qtde_vagas: evento.qtde_vagas,
      banner: evento.banner,
      valor: evento.valor,
      vigente: evento.vigente,
      banner_pictureFile: evento.banner_pictureFile,
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
      banner: evento.banner,
      valor: evento.valor,
      vigente: false,
      banner_pictureFile: evento.banner_pictureFile,
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
    if (evento.banner === "" && evento.banner_pictureFile === null) {
      showNotification({
        type: "warning",
        message: "Selecione o Banner do Evento.",
        title: "Banner não selecionado",
      });
      return;
    }

    Data ? UpdateEvento() : CreateEvento();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setEvento((prev) => ({
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

  useEffect(() => {
    if (Data) {
      setEvento(Data);
      if (Data.banner)
        setBannerBase64(apiHostBase + "/download?file=" + Data.banner);
    }
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
            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                        banner: "",
                        banner_pictureFile: null,
                      }));
                      setBannerBase64("");
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
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={ptBR}
                  >
                    <DatePicker
                      label="Data de início"
                      views={["day", "month", "year"]}
                      value={new Date(evento.data_inicio)}
                      onChange={(event) => {
                        if (typeof event === "string") {
                          setEvento({ ...evento, data_inicio: event });
                        } else if (event instanceof Date) {
                          setEvento({
                            ...evento,
                            data_inicio: event.toISOString(),
                          });
                        }
                      }}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={ptBR}
                  >
                    <DatePicker
                      label="Data fim"
                      views={["day", "month", "year"]}
                      value={new Date(evento.data_fim)}
                      onChange={(event) => {
                        if (typeof event === "string") {
                          setEvento({ ...evento, data_fim: event });
                        } else if (event instanceof Date) {
                          setEvento({
                            ...evento,
                            data_fim: event.toISOString(),
                          });
                        }
                      }}
                    />
                  </LocalizationProvider>
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
