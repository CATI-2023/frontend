import {
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
import { eventos, patrocinadores } from "../../../../Types/type";
import { useEffect, useState } from "react";
import {
  postApoiadores,
  updateApoiadores,
} from "../../../../services/apoiadores";
import useNotification from "../../../../hooks/useNotification";
import { getEventos } from "../../../../services/evento";
import { Camera, Trash } from "@phosphor-icons/react";
import { formataCelular } from "../../../../constants/function";

type Nivel = "BRONZE" | "PRATA" | "OURO";

interface props {
  open: boolean;
  onClose: () => void;
  title: string;
  Data?: patrocinadores | null;
}

export function DialogActionsPatrocinadores({
  open,
  onClose,
  title,
  Data,
}: props) {
  const [patrocinador, setPatrocinador] = useState<patrocinadores>({
    razao_social: "",
    telefone: "",
    nivel: "BRONZE",
    email: "",
    banner_base64: "",
  });

  const [eventos, setEventos] = useState<eventos | null>(null);

  const showNotification = useNotification();

  async function getEvents() {
    await getEventos(0, "*")
      .then((res) => {
        setEventos(res.data);
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

  async function updatePatrocinador() {
    const data_ = {
      evento_id_reference: Data?.evento_id_reference,
      razao_social: patrocinador.razao_social,
      telefone: patrocinador.telefone,
      nivel: patrocinador.nivel,
      email: patrocinador.email,
      banner_base64: patrocinador.banner_base64,
    };

    await updateApoiadores(Data?.patrocinador_id, data_)
      .then(() => {
        showNotification({
          type: "success",
          message: "Colaborador atualizado com sucesso.",
          title: "Sucesso ao atualizar",
        }),
          window.location.reload();
      })
      .catch((err) =>
        showNotification({
          type: "error",
          message:
            "Erro ao atualizar Colaborador. " + err?.response?.data?.message,
          title: "Erro ao atualizar",
        })
      );
    onClose();
  }

  async function CreatePatrocinador() {
    const data_ = {
      evento_id_reference: patrocinador.evento_id_reference,
      razao_social: patrocinador.razao_social,
      telefone: patrocinador.telefone,
      nivel: patrocinador.nivel,
      email: patrocinador.email,
      banner_base64: patrocinador.banner_base64,
    };

    if (patrocinador.evento_id_reference != undefined) {
      await postApoiadores(data_)
        .then(() => {
          showNotification({
            type: "success",
            message: "Colaborador criado com sucesso.",
            title: "Sucesso ao criar",
          });
          window.location.reload();
        })
        .catch((err) => {
          showNotification({
            type: "error",
            message:
              "Erro ao cadastrar Colaborador. " + err?.response?.data?.message,
            title: "Erro ao atualizar",
          });
        });
    } else {
      showNotification({
        type: "warning",
        message: "Selecione um evento",
        title: "Evento não selecionado",
      });
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPatrocinador((prev) => ({
          ...prev,
          banner_base64: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    Data ? updatePatrocinador() : CreatePatrocinador();
  };

  useEffect(() => {
    if (Data) {
      setPatrocinador(Data);
    } else {
      getEvents();
    }
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
                <TextField
                  required
                  size="small"
                  label="Razão social"
                  placeholder="Razão social"
                  value={patrocinador.razao_social}
                  onChange={(e) => {
                    setPatrocinador({
                      ...patrocinador,
                      razao_social: e.target.value,
                    });
                  }}
                  fullWidth
                />
                <TextField
                  required
                  label="Telefone"
                  fullWidth
                  size="small"
                  value={patrocinador.telefone}
                  onChange={(e) => {
                    setPatrocinador({
                      ...patrocinador,
                      telefone: formataCelular(e.target.value),
                    });
                  }}
                />
                <FormControl>
                  <FormLabel sx={{ fontSize: "14px" }}>Nivel</FormLabel>
                  <Select
                    required
                    size="small"
                    value={
                      patrocinador.nivel == undefined
                        ? "BRONZE"
                        : patrocinador.nivel
                    }
                    onChange={(e) => {
                      const selectedNivel = e.target.value as Nivel;
                      setPatrocinador({
                        ...patrocinador,
                        nivel: selectedNivel,
                      });
                    }}
                  >
                    <MenuItem value={"BRONZE"}>Bronze</MenuItem>
                    <MenuItem value={"PRATA"}>Prata</MenuItem>
                    <MenuItem value={"OURO"}>Ouro</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Evento</FormLabel>
                  <Select
                    required
                    value={
                      Data
                        ? String(patrocinador.evento_id_reference)
                        : undefined
                    }
                    size="small"
                    onChange={(e) => {
                      setPatrocinador({
                        ...patrocinador,
                        evento_id_reference: Number(e.target.value),
                      });
                    }}
                  >
                    {eventos?.eventos.map((evento) => (
                      <MenuItem
                        value={String(evento.evento_id)}
                        key={evento.evento_id}
                      >
                        {evento.tema} - {evento.ano}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  required
                  label="Email"
                  type="email"
                  fullWidth
                  size="small"
                  value={patrocinador.email}
                  onChange={(e) => {
                    setPatrocinador({
                      ...patrocinador,
                      email: e.target.value,
                    });
                  }}
                />
                <Divider
                  sx={{
                    mt: 2,
                    mb: 2,
                  }}
                >
                  Banner de divulgação
                </Divider>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap={1}
                >
                  <Avatar
                    src={patrocinador.banner_base64}
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
                        setPatrocinador((prev) => ({
                          ...prev,
                          banner_base64: "",
                        }));
                      }}
                    >
                      <Trash />
                    </Button>
                  </Box>
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
