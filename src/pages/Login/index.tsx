import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/Auth";
import { doLogin } from "../../services/login";
import { Alert, Box, Button, TextField } from "@mui/material";
import { ModalParticipante } from "../../components/ModalParticipante/modalParticipante";

export function LoginPage() {
  const [Login, setLogin] = useState({ email: "", senha: "" });
  const navigate = useNavigate();
  const AuthLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    await doLogin(Login)
      .then((res) => {
        if (res.status === 200) {
          login(res.data.auth.token);
          if (res.data.auth.participante.organizacao) {
            navigate(
              "/dashboard/org/" + res.data.auth.participante.participante_id
            );
          } else {
            navigate(
              "/dashboard/user/" + res.data.auth.participante.participante_id
            );
          }
        } else {
          setAlertWarning(true);
          setAlertWarningMessage(res.data.message);
        }
      })
      .catch((err) => {
        setAlertWarning(true);
        setAlertWarningMessage(err.response.data.message);
      });
    // if (Login.user === "user" && Login.password === "user") {
    //   login("123");
    //   navigate("/dashboard/user/123");
    // }
    // if (Login.user === "org" && Login.password === "org") {
    //   login("123");
    //   navigate("/dashboard/org/123");
    // }
  };

  const [alertWarning, setAlertWarning] = useState(false);
  const [alertWarningMessage, setAlertWarningMessage] = useState("");

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
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
          <form onSubmit={AuthLogin}>
            {alertWarning && (
              <Alert severity="error" sx={{ margin: "1rem 0" }}>
                {alertWarningMessage}
              </Alert>
            )}
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
              gap={2}
              color={"black"}
            >
              <h1 style={{ textAlign: "center" }}>Área do Participante</h1>
              <TextField
                required
                fullWidth
                label="Email"
                onChange={(e) => {
                  setLogin({ ...Login, email: e.target.value });
                }}
              />
              <TextField
                required
                fullWidth
                label="Senha"
                type="password"
                onChange={(e) => {
                  setLogin({ ...Login, senha: e.target.value });
                }}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  fontFamily: "Nasalization",
                }}
              >
                Acessar
              </Button>
              <p style={{ textAlign: "center" }}>
                Ainda não se inscreveu?
                <Button
                  onClick={handleOpen}
                  variant={"contained"}
                  color={"warning"}
                  sx={{
                    fontFamily: "Nasalization",
                    margin: { xs: "1rem 0 0 0", md: "0 0 0 .5rem" },
                  }}
                >
                  Inscreva-se aqui
                </Button>
              </p>
              <ModalParticipante open={open} onClose={handleClose} />
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}
