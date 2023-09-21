import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/Auth";
import { Box, Button, TextField } from "@mui/material";

export function LoginPage() {
  const [Login, setLogin] = useState({ user: "", password: "" });
  const navigate = useNavigate();
  const AuthLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (Login.user === "admin" && Login.password === "admin") {
      login("123");
      navigate("/dashboard");
    }
  };
  return (
    <>
      <Box
        height={"100vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <form onSubmit={AuthLogin}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            gap={2}
            p={10}
            bgcolor="white"
            color={"black"}
            borderRadius={2}
          >
            <h1>Pagina de Login</h1>
            <TextField
              required
              label="User"
              onChange={(e) => {
                setLogin({ ...Login, user: e.target.value });
              }}
            />
            <TextField
              required
              label="Password"
              type="password"
              onChange={(e) => {
                setLogin({ ...Login, password: e.target.value });
              }}
            />
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
