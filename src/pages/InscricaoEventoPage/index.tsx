import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import usePageTitle from "../../hooks/usePageTitle";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import useNotification from "../../hooks/useNotification";
import { Camera, Trash } from "@phosphor-icons/react";
import { createInscricaoEvento } from "../../services/inscricaoEvento";
import {
  formataCPF,
  formataCelular,
  validaCPF,
} from "../../constants/function";

// Refatorar isso depois
type EventoResponse = {
  evento_id: number;
  ano: number;
  tema: string;
  data_inicio: Date;
  data_fim: Date;
  qtde_vagas: number;
  banner_base64: string;
};

interface CreateInscricaoRequest {
  evento_id_reference: number;
  participante: Participante;
  observacoes: string;
}

interface Participante {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  confirmar_senha: string;
  telefone: string;
  foto: string;
  tamanho_camiseta: string;
}

const TAMANHOS_CAMISETA = ["PP", "P", "M", "G", "GG", "XG"];

export function InscricaoEventoPage() {
  const { id } = useParams();
  const showNotification = useNotification();

  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const [inscricao, setInscricao] = useState<CreateInscricaoRequest>({
    evento_id_reference: 0,
    participante: {
      nome: "",
      cpf: "",
      email: "",
      senha: "",
      confirmar_senha: "",
      telefone: "",
      foto: "",
      tamanho_camiseta: "",
    },
    observacoes: "",
  });

  const { data } = useFetch<EventoResponse>(id ? `/eventos/${id}` : "");
  // Refatorar
  usePageTitle(`Inscrição CATI ${data?.ano ?? ""} `);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!data) return;

    const _data = {
      evento_id_reference: data.evento_id,
      observacoes: `Camiseta tamanho ${inscricao.participante.tamanho_camiseta}`,
      participante: {
        nome: inscricao.participante.nome.trim(),
        cpf: inscricao.participante.cpf.trim().replace(/[^\d]+/g, ""),
        email: inscricao.participante.email.trim(),
        senha: inscricao.participante.senha.trim(),
        foto: inscricao.participante.foto,
        telefone: inscricao.participante.telefone.trim(),
        organizacao: false,
      },
    };

    if (!validaCPF(_data.participante.cpf)) {
      showNotification({
        message: "CPF inválido",
        type: "error",
      });
      return;
    }

    if (_data.participante.senha !== inscricao.participante.confirmar_senha) {
      showNotification({
        message: "As senhas não conferem",
        type: "error",
      });
      return;
    }

    setSaving(true);

    await createInscricaoEvento(_data)
      .then((res) => {
        const { token } = res;

        localStorage.setItem("accessToken", token);

        showNotification({
          message: "Inscrição realizada com sucesso",
          type: "success",
        });

        //Navegar para o portal/administrativo
        navigate("/login");
      })
      .catch((err) => {
        showNotification({
          message: err?.response?.data?.message ?? "Erro ao realizar inscrição",
          type: "error",
        });
      });

    setSaving(false);
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setInscricao((prev) => ({
          ...prev,
          participante: {
            ...prev.participante,
            foto: reader.result as string,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Card
          sx={{
            p: 4,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Divider
              sx={{
                mt: 2,
                mb: 2,
              }}
            >
              Dados do participante
            </Divider>

            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={1}
            >
              <Avatar
                src={inscricao.participante.foto}
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
                    setInscricao((prev) => ({
                      ...prev,
                      participante: {
                        ...prev.participante,
                        foto: "",
                      },
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
                value={inscricao.participante.nome}
                onChange={(e) => {
                  setInscricao({
                    ...inscricao,
                    participante: {
                      ...inscricao.participante,
                      nome: e.target.value,
                    },
                  });
                }}
                size="small"
              />
              <Stack direction="row" spacing={1}>
                <TextField
                  fullWidth
                  label="CPF"
                  value={inscricao.participante.cpf}
                  placeholder="CPF"
                  inputProps={{
                    maxLength: 14,
                  }}
                  onChange={(e) => {
                    setInscricao({
                      ...inscricao,
                      participante: {
                        ...inscricao.participante,
                        cpf: formataCPF(e.target.value),
                      },
                    });
                  }}
                  required
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Telefone"
                  placeholder="Telefone"
                  value={inscricao.participante.telefone}
                  onChange={(e) => {
                    setInscricao({
                      ...inscricao,
                      participante: {
                        ...inscricao.participante,
                        telefone: formataCelular(e.target.value),
                      },
                    });
                  }}
                  required
                  size="small"
                />
              </Stack>
              <FormControl variant="standard" size="small">
                <FormLabel>Tamanho da camiseta</FormLabel>
                <FormGroup row>
                  {TAMANHOS_CAMISETA.map((tamanho) => {
                    return (
                      <FormControlLabel key={tamanho}
                        control={
                          <Checkbox
                            checked={
                              inscricao.participante.tamanho_camiseta ===
                              tamanho
                            }
                            onChange={() =>
                              setInscricao({
                                ...inscricao,
                                participante: {
                                  ...inscricao.participante,
                                  tamanho_camiseta: tamanho,
                                },
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
                value={inscricao.participante.email}
                onChange={(e) => {
                  setInscricao({
                    ...inscricao,
                    participante: {
                      ...inscricao.participante,
                      email: e.target.value,
                    },
                  });
                }}
              />

              <Stack direction="row" spacing={1}>
                <TextField
                  label="Senha"
                  placeholder="Senha"
                  required
                  size="small"
                  type="password"
                  value={inscricao.participante.senha}
                  onChange={(e) => {
                    setInscricao({
                      ...inscricao,
                      participante: {
                        ...inscricao.participante,
                        senha: e.target.value,
                      },
                    });
                  }}
                />

                <TextField
                  label="Confirme a senha"
                  placeholder="Confirme a senha"
                  required
                  size="small"
                  type="password"
                  value={inscricao.participante.confirmar_senha}
                  onChange={(e) => {
                    setInscricao({
                      ...inscricao,
                      participante: {
                        ...inscricao.participante,
                        confirmar_senha: e.target.value,
                      },
                    });
                  }}
                />
              </Stack>
            </Box>
            <Button
              type="submit"
              fullWidth
              disabled={saving}
              variant="contained"
              color="success"
              sx={{ mt: 3, height: 38 }}
            >
              {saving ? (
                <CircularProgress
                  size={20}
                  sx={{
                    color: "white",
                  }}
                />
              ) : (
                "Inscrever-se"
              )}
            </Button>
          </form>
        </Card>
      </Box>
    </Container>
  );
}
