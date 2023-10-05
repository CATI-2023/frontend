import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/Auth";
import { Box, Button, TextField } from "@mui/material";
import { ModalParticipante } from "../../components/ModalParticipante/modalParticipante";

export function LoginPage() {
  const [Login, setLogin] = useState({ user: "", password: "" });
  const navigate = useNavigate();
  const AuthLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (Login.user === "user" && Login.password === "user") {
      login("123");
      navigate("/dashboard/user/123");
    }
    if (Login.user === "org" && Login.password === "org") {
      login("123");
      navigate("/dashboard/org/123");
    }
  };

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
                <Button onClick={handleOpen} variant={"text"} color={"warning"}>
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
