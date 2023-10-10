import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/Auth";
import { Box, Button, TextField } from "@mui/material";
import { getAuthUser } from "../../services/auth";

export function LoginPage() {
  const [Login, setLogin] = useState({ user: "", password: "" });
  const navigate = useNavigate();

  async function AuthLogin(event: React.FormEvent) {
    event.preventDefault();
    await getAuthUser({ email: Login.user, senha: Login.password }).then(
      (auth) => {
        login(auth.auth.token);
        if (auth.auth.participante.organizacao == true) {
          navigate("/dashboard/org/");
        } else {
          navigate("/dashboard/user/");
        }
      }
    );
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
                label="User"
                onChange={(e) => {
                  setLogin({ ...Login, user: e.target.value });
                }}
              />
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                onChange={(e) => {
                  setLogin({ ...Login, password: e.target.value });
                }}
              />
              <Button variant="contained" type="submit">
                Acessar
              </Button>
              <p>
                Ainda não se inscreveu?
                <Button
                  onClick={() => { navigate("/evento/1/inscricao") }}
                  variant={"text"}
                  color={"warning"}
                >
                  Inscreva-se aqui
                </Button>
              </p>
              {/* <ModalParticipante open={open} onClose={handleClose} /> */}
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}
