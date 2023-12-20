import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { putRecuperacaoSenha, getRecuperacaoSenha } from "../../services/auth";
import useNotification from "../../hooks/useNotification";
import { DefaultsIcons } from "../../constants/DefaultIcons";
import { LogoCatiPreto } from "../../assets/logoCati-Preto";

type dataUser = {
  recuperacao_senha_id: number;
  participante_id_reference: number;
  participante: {
    nome: string;
    email: string;
  };
};

export function RecuperacaoSenhaPage() {
  const [recuperacaoSenha, setRecuperacaoSenha] = useState({
    senha: "",
    confirmarSenha: "",
  });

  const { hash } = useParams();

  // const { data: dataFetch, error: error } = useFetch<dataUserFetch>(
  //   "/auth/recuperacao-senha?hash=" + hash
  // );

  const [userData, setUserData] = useState<dataUser | null>(null);

  useEffect(() => {
    if (userData == null) getRecuperacao();
  }, []);

  const navigate = useNavigate();
  const showNotification = useNotification();

  async function getRecuperacao() {
    await getRecuperacaoSenha(hash as string)
      .then((res) => {
        setUserData(res.data.recuperacaoSenha);
      })
      .catch((err) => {
        setUserData(null);
        showNotification({
          message:
            "Erro ao recuperar senha: " + err?.response?.data?.message ??
            "Erro ao recuperar senha.",
          type: "error",
        });
      });
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (userData == null) {
      showNotification({
        message: "Erro ao recuperar senha.",
        type: "error",
      });
    }

    if (recuperacaoSenha.senha !== recuperacaoSenha.confirmarSenha) {
      showNotification({
        message: "As senhas não coincidem.",
        type: "warning",
      });
      return;
    }

    recuperarSenha();
  };

  async function recuperarSenha() {
    if (userData != null) {
      await putRecuperacaoSenha(userData.recuperacao_senha_id, recuperacaoSenha)
        .then(() => {
          showNotification({
            message: "Senha alterada com sucesso.",
            type: "success",
          });
          setTimeout(() => {}, 2000);
          window.location.href = "/login";
        })
        .catch((err) => {
          showNotification({
            message: err?.response?.data?.message ?? "Erro ao recuperar senha.",
            type: "error",
          });
        });
    }
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
          {userData !== null ? (
            <>
              <form onSubmit={handleSubmit}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  flexDirection={"column"}
                  gap={2}
                  color={"black"}
                >
                  <h2>Recuperação de senha</h2>
                  <TextField
                    required
                    fullWidth
                    label="Nova senha"
                    type="password"
                    onChange={(e) => {
                      setRecuperacaoSenha({
                        ...recuperacaoSenha,
                        senha: e.target.value,
                      });
                    }}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Confirme a nova senha"
                    type="password"
                    onChange={(e) => {
                      setRecuperacaoSenha({
                        ...recuperacaoSenha,
                        confirmarSenha: e.target.value,
                      });
                    }}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ fontFamily: "Nasalization, sans-serif" }}
                    size="large"
                  >
                    Alterar senha
                  </Button>
                </Box>
              </form>
            </>
          ) : (
            <>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
                textAlign={"center"}
                gap={2}
                color={"black"}
              >
                <h2>Esta solicitação já expirou ou não é válida.</h2>
                <LogoCatiPreto sx={{ width:{xs: "15em", md: "20em"}, marginBottom: {xs:"0", md:"-3em"}}} />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
