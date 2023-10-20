import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { participantes } from "../../../../Types/type";
import { useEffect, useState } from "react";
import {
  createParticipante,
  updateParticipante,
} from "../../../../services/participantes";
import useNotification from "../../../../hooks/useNotification";
import { Camera, Trash } from "@phosphor-icons/react";
import {
  formataCPF,
  formataCelular,
  validaCPF,
} from "../../../../constants/function";

interface props {
  open: boolean;
  onClose: () => void;
  title: string;
  Data?: participantes | null;
}
export function DialogActionsParticipantes({
  open,
  onClose,
  title,
  Data,
}: props) {
  // const [data: eventos] = useFetch<Evento>("evento")
  const [participante, setParticipante] = useState<participantes>({
    nome: "",
    foto: "",
    cpf: "",
    telefone: "",
    email: "",
    senha: "",
    organizacao: false,
  });
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  const showNotification = useNotification();

  const data = {
    nome: participante.nome.trim(),
    foto: participante.foto,
    cpf: participante.cpf.trim().replace(/[^\d]+/g, ""),
    telefone: participante.telefone.trim().replace(/[^\d]+/g, ""),
    email: participante.email.trim(),
    senha: participante.senha?.trim(),
    organizacao: participante.organizacao,
  };

  async function UpdateParticipantes() {
    await updateParticipante(Data?.participante_id, data)
      .then(() => {
        showNotification({
          type: "success",
          message: "Participante atualizado com sucesso.",
          title: "Sucesso ao atualizar",
        });
        window.location.reload();
      })
      .catch((err) =>
        showNotification({
          type: "error",
          message:
            "Erro ao atualizar participante. " + err?.response?.data?.message,
          title: "Erro ao atualizar",
        })
      );
    onClose();
  }
  async function CreateParticipantes() {
    await createParticipante(data)
      .then(() => {
        showNotification({
          type: "success",
          message: "Participante criado com sucesso.",
          title: "Sucesso ao criar",
        });
        window.location.reload();
      })
      .catch((err) => {
        showNotification({
          type: "error",
          message:
            "Erro ao criar participante. " + err?.response?.data?.message,
          title: "Erro ao criar",
        });
      });
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validaCPF(participante.cpf)) {
      showNotification({
        message: "CPF inválido",
        type: "error",
      });
      return;
    }

    if (participante.senha && participante.senha !== confirmarSenha) {
      showNotification({
        message: "As senhas não conferem",
        type: "error",
      });
      return;
    }

    Data ? UpdateParticipantes() : CreateParticipantes();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setParticipante((prev) => ({
          ...prev,
          foto: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (Data) setParticipante(Data);
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
            {" "}
            <form onSubmit={handleSubmit}>
              <Divider
                sx={{
                  mt: 2,
                  mb: 2,
                }}
              >
                Dados do Participante
              </Divider>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1}
              >
                <Avatar
                  src={participante.foto}
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
                      setParticipante((prev) => ({
                        ...prev,
                        foto: "",
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
                  placeholder="Nome completo"
                  label="Nome completo"
                  required
                  value={participante.nome}
                  onChange={(e) => {
                    setParticipante({
                      ...participante,
                      nome: e.target.value,
                    });
                  }}
                  size="small"
                />
                <Stack direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    label="CPF"
                    value={participante.cpf}
                    placeholder="CPF"
                    inputProps={{
                      maxLength: 14,
                    }}
                    onChange={(e) => {
                      setParticipante({
                        ...participante,
                        cpf: formataCPF(e.target.value),
                      });
                    }}
                    required
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Telefone"
                    placeholder="Telefone"
                    value={participante.telefone}
                    onChange={(e) => {
                      setParticipante({
                        ...participante,
                        telefone: formataCelular(e.target.value),
                      });
                    }}
                    required
                    size="small"
                  />
                </Stack>
                <Divider
                  sx={{
                    my: 2,
                  }}
                >
                  Organização
                </Divider>{" "}
                <Stack spacing={2}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={participante.organizacao}
                          onChange={(e) => {
                            setParticipante({
                              ...participante,
                              organizacao: e.target.checked,
                            });
                          }}
                        />
                      }
                      label="Participante tem acesso de organização "
                    />
                  </FormGroup>
                </Stack>
              </Box>
              <Divider
                sx={{
                  my: 2,
                }}
              >
                Credenciais de acesso
              </Divider>
              <Box display="flex" flexDirection="column" gap={1}>
                <TextField
                  fullWidth
                  required
                  label="E-mail"
                  placeholder="E-mail"
                  size="small"
                  type="email"
                  value={participante.email}
                  onChange={(e) => {
                    setParticipante({
                      ...participante,
                      email: e.target.value,
                    });
                  }}
                />

                <Stack direction="row" spacing={1}>
                  <TextField
                    label="Senha"
                    placeholder="Senha"
                    required={Data ? false : true}
                    size="small"
                    type="password"
                    value={participante.senha}
                    onChange={(e) => {
                      setParticipante({
                        ...participante,
                        senha: e.target.value,
                      });
                    }}
                  />

                  <TextField
                    label="Confirme a senha"
                    placeholder="Confirme a senha"
                    required={Data ? false : true}
                    size="small"
                    type="password"
                    value={confirmarSenha}
                    onChange={(e) => {
                      setConfirmarSenha(e.target.value);
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
