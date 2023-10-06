import { Alert, Avatar, Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { updateParticipante, getParticipante } from "../../../../services/participantes";
import { participantes } from "../../../../Types/type";
import { photoDefault } from "../../../../components/photoDefault";
import {
  formataCPF,
  formataTelefone,
  validaCPF,
} from "../../../../constants/function";

interface InformacoesParticipanteProps {
  participanteID: Number;
}

export function InformacoesParticipante({
  participanteID,
}: InformacoesParticipanteProps) {
  const [alertWarning, setAlertWarning] = useState(false);
  const [alertWarningMessage, setAlertWarningMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertSuccessMessage, setAlertSuccessMessage] = useState("");

  async function ReadParticipante(id: number) {
    await getParticipante(id).then((response) => {
      setData(response.data);
    });
    // await getInscricaoEvento(1).then((response) => {
    //   setInscricao_evento(response.data);
    // });
  }

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

  const resetChanges = () => {
    // ReadParticipante();
  };

  
  useEffect(() => {
    ReadParticipante(Number(participanteID));
  }, [participanteID]);

  // async function updateParticipante() {
  //   const Data = {
  //     nome: data?.nome,
  //     email: data?.email,
  //     telefone: data?.telefone,
  //     foto: data?.foto ? data?.foto : photoDefault(),
  //     senha: data?.senha,
  //     cpf: data?.cpf,
  //     organizacao: false,
  //   };
  //   await updateParticipante(Data)
  //     .then((res) => {
  //       // if (res.status === 201) {
  //       //   setAlertSuccess(true);
  //       //   setAlertSuccessMessage("Participante Cadastrado com Sucesso.");
  //       // } else {
  //       //   setAlertWarning(true);
  //       //   setAlertWarningMessage("");
  //       // }
  //     })
  //     .catch((err) => {
  //       setAlertWarning(true);
  //       setAlertWarningMessage(err.response.data.message);
  //     });
  // }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validaCPF(data?.cpf as string)) {
      setAlertWarningMessage("CPF inválido.");
      setAlertWarning(true);
    } else {
      if (revalidarSenha === data?.senha) {
        // updateParticipante();
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
      <Box sx={{ backgroundColor: "white", margin: "2rem" }}>
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
            <h2 style={{ color: "black", margin: "2rem 0 0 0" }}>
              Bem vindo {data?.nome}
            </h2>
            <Box display={"grid"} flexDirection={"row"} gap={2} my={2}>
              <TextField
                required
                label="Nome"
                value={data?.nome}
                fullWidth
                onChange={(e) => {
                  setData({ ...data, nome: e.target.value });
                }}
              />
              <TextField
                required
                value={data?.email}
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
            <Box display={"flex"} flexDirection={"row"} gap={2} mb={2} mt={2}>
              <Button variant="contained" color="success" type="submit">
                Salvar alterações
              </Button>
              <Button
                variant="contained"
                color="info"
                onClick={resetChanges}
              >
                Limpar
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
}
