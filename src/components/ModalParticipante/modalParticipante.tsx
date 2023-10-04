import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { createParticipante } from "../../services/participantes";
import { participantes } from "../../Types/type";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}
export function ModalParticipante({ open, onClose }: SimpleDialogProps) {
  const [data, setData] = useState<participantes | null>(null);
  const [revalidarSenha, setRevalidarSenha] = useState<string>("");
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setData({ ...data, foto: reader.result as string });
        // setData({ ...data, foto: "aaaaaaaa" });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClose = () => {
    onClose();
  };
  async function NewParticipante() {
    const Data = {
      nome: data?.nome,
      email: data?.email,
      telefone: data?.telefone,
      foto: "sem img",
      senha: data?.senha,
      cpf: data?.cpf,
      organizacao: false,
    };
    await createParticipante(Data);
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (revalidarSenha === data?.senha) {
      NewParticipante();
    } else {
      alert("Senhas não coincidem");
    }
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} sx={{ height: "auto" }}>
        <form onSubmit={handleSubmit}>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <DialogTitle>Inscrever-se</DialogTitle>
            <DialogContent>
              <Box my={2}>
                <TextField
                  label="Nome"
                  fullWidth
                  onChange={(e) => {
                    setData({ ...data, nome: e.target.value });
                  }}
                />
              </Box>
              <Box
                display={"grid"}
                gridTemplateColumns={"auto auto"}
                gap={2}
                my={2}
              >
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                />
                <TextField
                  label="CPF"
                  fullWidth
                  onChange={(e) => {
                    setData({ ...data, cpf: e.target.value });
                  }}
                />
                <TextField
                  label="Telefone"
                  fullWidth
                  onChange={(e) => {
                    setData({ ...data, telefone: e.target.value });
                  }}
                />
                <TextField
                  label="Senha"
                  type="password"
                  fullWidth
                  onChange={(e) => {
                    setData({ ...data, senha: e.target.value });
                  }}
                />
              </Box>
              <Box my={2}>
                <TextField
                  label="Digite novamente a senha"
                  type="password"
                  fullWidth
                  onChange={(e) => {
                    setRevalidarSenha(e.target.value);
                  }}
                />
              </Box>
              <Box
                display={"flex"}
                flexDirection={{
                  xs: "column",
                  sm: "column",
                  md: "row",
                  lg: "row",
                  xl: "row",
                }}
                alignItems={"center"}
              >
                <input
                  type="file"
                  placeholder="Foto"
                  accept="image/jpg, image/jpeg, image/png"
                  onChange={(e) => {
                    handleImageUpload(e);
                  }}
                />
                {data?.foto ? (
                  <img
                    src={data?.foto}
                    alt="imagem do participante"
                    height={"120px"}
                  />
                ) : null}
              </Box>
            </DialogContent>
            <DialogActions>
              <Box display={"flex"} flexDirection={"row"} gap={2} mb={2}>
                <Button variant="contained" color="success" type="submit">
                  Salvar
                </Button>
                <Button variant="contained" color="error" onClick={handleClose}>
                  Fechar
                </Button>
              </Box>
            </DialogActions>
          </Box>
        </form>
      </Dialog>
    </>
  );
}
