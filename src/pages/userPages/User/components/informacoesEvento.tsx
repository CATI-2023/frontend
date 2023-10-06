import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getEventos } from "../../../../services/evento";
import { evento } from "../../../../Types/type";

interface InformacoesParticipanteProps {
  participanteID: Number;
}

export function InformacoesEvento({
  participanteID,
}: InformacoesParticipanteProps) {
  async function ReadEventosList() {
    await getEventos().then((response) => {
      setEventosList(response.data);
    });
  }

  const [eventosList, setEventosList] = useState<evento[] | null>(null);

  useEffect(() => {
    ReadEventosList();
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if (!validaCPF(data?.cpf as string)) {
    //   setAlertWarningMessage("CPF inválido.");
    //   setAlertWarning(true);
    // } else {
    //   if (revalidarSenha === data?.senha) {
    //     updateParticipante();
    //     setAlertWarning(false);
    //     setAlertWarningMessage("");
    //   } else {
    //     setAlertWarningMessage("Senhas não conferem.");
    //     setAlertWarning(true);
    //   }
    // }
  };

  return (
    <>
      <Box sx={{ backgroundColor: "white", margin: "2rem" }}>
        <form onSubmit={handleSubmit}>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <h2 style={{ color: "black", margin: "2rem 0 0 0" }}>
              Inscrições de Eventos
            </h2>
            <Box display={"grid"} flexDirection={"row"} gap={2} my={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Eventos</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Age"
                  // onChange={handleChange}
                >
                  {/* {eventosList ? (
                    eventosList.forEach((i) => (
                      <MenuItem value={i.ano} key={i.ano}>
                        {i.ano} - {i.tema}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value={10}></MenuItem>
                  )} */}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
}
