import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/Auth";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { getAuthUser, postRecuperacaoSenha } from "../../services/auth";
import { getEventoVigente } from "../../services/evento";
import useNotification from "../../hooks/useNotification";
import { DefaultsIcons } from "../../constants/DefaultIcons";
import { NotePencil, Password, SignIn } from "@phosphor-icons/react";

export function LoginPage() {
  const [Login, setLogin] = useState({ user: "", password: "" });
  const navigate = useNavigate();
  const showNotification = useNotification();

  async function AuthLogin(event: React.FormEvent) {
    event.preventDefault();
    await getAuthUser({ email: Login.user, senha: Login.password })
      .then((auth) => {
        login(auth.auth.token);
        if (auth.auth.participante.organizacao == true) {
          navigate("/dashboard/org/");
        } else {
          navigate("/dashboard/user/");
        }
        showNotification({
          message: "Login realizado com sucesso.",
          type: "success",
        });
      })
      .catch((err) => {
        showNotification({
          message: err?.response?.data?.message ?? "Erro ao realizar login.",
          type: "error",
        });
      });
  }

  async function navigateInscricaoPage() {
    await getEventoVigente()
      .then((resp) => {
        if (resp.data.eventoVigente) {
          navigate(
            "/evento/" + resp.data.eventoVigente.evento_id + "/inscricao"
          );
        } else {
          showNotification({
            message: "Nenhum evento vigente encontrado",
            type: "warning",
          });
        }
      })
      .catch(() => {
        showNotification({
          message: "Erro ao buscar por evento vigente.",
          type: "error",
        });
      });
  }

  async function recuperacaoSenha() {
    if (Login.user == "") {
      showNotification({
        message: "Informe o email.",
        type: "warning",
      });
      return;
    }

    await postRecuperacaoSenha({ email: Login.user })
      .then(() => {
        showNotification({
          message:
            "Um email foi encaminhado para você com o procedimento para recuperação de senha.",
          type: "success",
        });
      })
      .catch((err) => {
        showNotification({
          message:
            "Erro ao recuperar senha: " + err?.response?.data?.message ??
            "Erro ao recuperar senha.",
          type: "error",
        });
      });
  }

  return (
    <>
      <Box
        height={"100vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          bgcolor={"white"}
          borderRadius={2}
          width={{ xs: "90%", sm: "90%", md: "80%", lg: "auto", xl: "auto" }}
          px={{ xs: 2, sm: 2, md: 6, lg: 10, xl: 10 }}
          py={{ xs: 2, sm: 2, md: 6, lg: 10, xl: 10 }}
        >
          <Button
            onClick={() => {
              navigate("/");
            }}
            variant={"contained"}
            color={"info"}
            sx={{
              fontFamily: "Nasalization, sans-serif",
              margin: { xs: "0 0 1rem 0", md: "-2rem 0 2rem 0" },
            }}
          >
            <IconButton color="inherit" sx={{ padding: "0" }}>
              <DefaultsIcons.BackIcon />
            </IconButton>
            Página Inicial
          </Button>
          <form onSubmit={AuthLogin}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
              gap={2}
              color={"black"}
            >
              <h1>Acesse a área do participante</h1>
              <TextField
                required
                fullWidth
                label="Email"
                onChange={(e) => {
                  setLogin({ ...Login, user: e.target.value });
                }}
              />
              <TextField
                required
                fullWidth
                label="Senha"
                type="password"
                onChange={(e) => {
                  setLogin({ ...Login, password: e.target.value });
                }}
              />
              <Button
                variant="contained"
                type="submit"
                size="large"
                sx={{ fontFamily: "Nasalization, sans-serif" }}
                startIcon={<SignIn />}
              >
                Acessar
              </Button>
              <p style={{ textAlign: "center" }}>
                Esqueceu sua senha?
                <Button
                  onClick={() => {
                    recuperacaoSenha();
                  }}
                  variant={"outlined"}
                  sx={{
                    fontFamily: "Nasalization, sans-serif",
                    margin: { md: "0 1rem", xs: ".5rem 0" },
                  }}
                  endIcon={<Password />}
                >
                  Recupere aqui
                </Button>
              </p>
              <p style={{ textAlign: "center" }}>
                Ainda não se inscreveu?
                <Button
                  onClick={() => {
                    navigateInscricaoPage();
                  }}
                  variant={"contained"}
                  color={"warning"}
                  sx={{
                    fontFamily: "Nasalization, sans-serif",
                    margin: { md: "0 1rem", xs: ".5rem 0" },
                  }}
                  endIcon={<NotePencil />}
                >
                  Inscreva-se aqui
                </Button>
              </p>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}
