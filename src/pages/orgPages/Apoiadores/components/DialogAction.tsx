import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  // const [data: eventos] = useFetch<Evento>("evento")
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
    await getEventos()
      .then((res) => {
        setEventos(res.data);
      })
      .catch((err) => console.log(err));
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
      .then((res) => {
        showNotification({
          type: "success",
          message: "Patrocinador atualizado com sucesso." + res,
          title: "Sucesso ao atualizar",
        }),
          window.location.reload();
      })
      .catch((err) =>
        showNotification({
          type: "error",
          message: "Erro ao atualizar patrocinador." + err,
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
    // const data_ = {
    //   evento_id_reference: 1,
    //   razao_social: "teste 5",
    //   telefone: "3361-0000",
    //   nivel: "OURO",
    //   email: "teste5@apoiadores.com",
    //   banner_base64: "",
    // }
    if (patrocinador.evento_id_reference != undefined) {
      await postApoiadores(data_)
        .then((res) => {
          showNotification({
            type: "success",
            message: "Patrocinador criado com sucesso." + res,
            title: "Sucesso ao criar",
          });
          window.location.reload();
        })
        .catch((err) => {
          showNotification({
            type: "error",
            message: "Erro ao criar patrocinador." + err,
            title: "Erro ao criar",
          });
        });
        
    } else {
      showNotification({
        type: "error",
        message: "Por favor selecione um evento.",
        title: "Erro ao criar",
      });
    }
    console.log(
      patrocinador.evento_id_reference,
      patrocinador.razao_social,
      patrocinador.telefone,
      patrocinador.nivel,
      patrocinador.email,
      patrocinador.banner_base64
    );
  }

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
  console.log(patrocinador.evento_id_reference);
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
                  label="Razão social"
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
                  value={patrocinador.telefone}
                  onChange={(e) => {
                    setPatrocinador({
                      ...patrocinador,
                      telefone: e.target.value,
                    });
                  }}
                />
                <FormControl>
                  <FormLabel sx={{ fontSize: "14px" }}>Nivel</FormLabel>
                  <Select
                    required
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
                  </Select>{" "}
                </FormControl>
                <FormControl>
                  {!Data ? (
                    <>
                      <FormLabel>Evento</FormLabel>
                      <Select
                        required
                        onChange={(e) => {
                          setPatrocinador({
                            ...patrocinador,
                            evento_id_reference: Number(e.target.value),
                          });
                        }}
                      >
                        {eventos?.eventos.map((evento) => (
                          <MenuItem value={String(evento.evento_id)}>
                            {evento.tema} - {evento.ano}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  ) : null}
                </FormControl>
                <TextField
                  required
                  label="Email"
                  fullWidth
                  value={patrocinador.email}
                  onChange={(e) => {
                    setPatrocinador({
                      ...patrocinador,
                      email: e.target.value,
                    });
                  }}
                />
                <TextField
                  label="Banner"
                  fullWidth
                  value={patrocinador.banner_base64}
                  onChange={(e) => {
                    setPatrocinador({
                      ...patrocinador,
                      banner_base64: e.target.value,
                    });
                  }}
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
