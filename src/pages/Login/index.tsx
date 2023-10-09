import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/Auth";
import { Box, Button, TextField } from "@mui/material";
import { ModalParticipante } from "../../components/ModalParticipante/modalParticipante";
import { getAuthUser } from "../../services/auth";
type auth = {
  email: string;
  senha: string
}

type auth_request ={
  auth: {
    token: string;
    participante: {
      email:string;
      foto: string
      participante_id: number;
      nome: string;
      organizacao: boolean;
    }
  }
}

export function LoginPage() {
  const [Login, setLogin] = useState({ user: "", password: "" });
  const [auth, setAuth] = useState({} as auth_request)
  const navigate = useNavigate();
   async function getAuth(data: auth){
    await getAuthUser(data).then((response) => {
      setAuth(response.data);
      console.log(response.data)
    })
  }


  const AuthLogin = (event: React.FormEvent) => {
    event.preventDefault();
      getAuth({email: Login.user, senha:Login.password})
      console.log(auth)
      login(auth.auth.token);
      if(auth.auth.participante.organizacao == true){
        navigate("/dashboard/org/"+ auth.auth.participante.participante_id);
      }
      else{
        navigate("/dashboard/user/"+auth.auth.participante.participante_id);
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
