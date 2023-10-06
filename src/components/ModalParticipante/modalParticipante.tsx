import { useState } from "react";
import {
  Alert,
  Avatar,
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
import { photoDefault } from "../../components/photoDefault";
import {
  formataCPF,
  formataTelefone,
  validaCPF,
} from "../../constants/function";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}
export function ModalParticipante({ open, onClose }: SimpleDialogProps) {
  const [alertWarning, setAlertWarning] = useState(false);
  const [alertWarningMessage, setAlertWarningMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertSuccessMessage, setAlertSuccessMessage] = useState("");

  const [data, setData] = useState<participantes | null>(null);
  const [revalidarSenha, setRevalidarSenha] = useState<string>("");
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setData({ ...data, foto: reader.result as string });
        // setData({ ...data, foto: "aaaaaaaa" });
      };
    }
  };
  const handleClose = () => {
    handleCleanData();
    setAlertSuccess(false);
    setAlertWarning(false);
    onClose();
  };

  const handleCleanData = () => {
    setData({
      ...data,
      nome: "",
      email: "",
      telefone: "",
      foto: photoDefault(),
      senha: "",
      cpf: "",
    });
  };

  async function NewParticipante() {
    const Data = {
      nome: data?.nome,
      email: data?.email,
      telefone: data?.telefone,
      foto: data?.foto ? data?.foto : photoDefault(),
      senha: data?.senha,
      cpf: data?.cpf,
      organizacao: false,
    };
    await createParticipante(Data)
      .then((res) => {
        if (res.status === 201) {
          handleCleanData();
          setAlertSuccess(true);
          setAlertSuccessMessage("Participante Cadastrado com Sucesso.");
        } else {
          setAlertWarning(true);
          setAlertWarningMessage("");
        }
      })
      .catch((err) => {
        setAlertWarning(true);
        setAlertWarningMessage(err.response.data.message);
      });
  }
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validaCPF(data?.cpf as string)) {
      setAlertWarningMessage("CPF inválido.");
      setAlertWarning(true);
    } else {
      if (revalidarSenha === data?.senha) {
        NewParticipante();
        setAlertWarning(false);
        setAlertWarningMessage("");
      } else {
        setAlertWarningMessage("Senhas não conferem.");
        setAlertWarning(true);
      }
    }
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} sx={{ height: "auto" }}>
        <form onSubmit={handleSubmit}>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            {alertWarning && (
              <Alert severity="warning" sx={{ margin: "1rem 0" }}>
                {alertWarningMessage}
              </Alert>
            )}
            {alertSuccess && (
              <Alert severity="success" sx={{ margin: "1rem 0" }}>
                {alertSuccessMessage}
              </Alert>
            )}
            <DialogTitle
              sx={{
                fontFamily: "Nasalization",
                fontWeight: "bold",
                fontSize: "2rem",
              }}
            >
              Inscrever-se
            </DialogTitle>
            <DialogContent>
              <Box display={"grid"} flexDirection={"row"} gap={2} my={2}>
                <TextField
                  required
                  label="Nome"
                  fullWidth
                  onChange={(e) => {
                    setData({ ...data, nome: e.target.value });
                  }}
                />
                <TextField
                  required
                  label="Email"
                  type="email"
                  fullWidth
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
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
                  required
                  label="CPF"
                  value={data?.cpf}
                  inputProps={{ minLength: 14, maxLength: 14 }}
                  fullWidth
                  onChange={(e) => {
                    setData({ ...data, cpf: formataCPF(e.target.value) });
                  }}
                />
                <TextField
                  required
                  label="Telefone"
                  fullWidth
                  value={data?.telefone}
                  inputProps={{ minLength: 18, maxLength: 18 }}
                  onChange={(e) => {
                    setData({
                      ...data,
                      telefone: formataTelefone(e.target.value),
                    });
                  }}
                ></TextField>
                <TextField
                  required
                  label="Senha"
                  type="password"
                  fullWidth
                  inputProps={{ minLength: 8 }}
                  onChange={(e) => {
                    setData({ ...data, senha: e.target.value });
                  }}
                />
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
                <Avatar
                  src={data?.foto}
                  sx={{ width: "7rem", height: "7rem" }}
                ></Avatar>
                <input
                  style={{ marginLeft: "1rem" }}
                  type="file"
                  placeholder="Foto"
                  accept="image/jpg, image/jpeg, image/png"
                  onChange={(e) => {
                    handleImageUpload(e);
                  }}
                />
                {/* {data?.foto ? (
                  <img
                    src={data?.foto}
                    alt="imagem do participante"
                    height={"120px"}
                  />
                ) : null} */}
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
