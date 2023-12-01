import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import { equipe, participante } from "../../../../Types/type";
import { postMembroEquipe } from "../../../../services/membrosEquipe";
import { getParticipantes } from "../../../../services/participantes";
import useNotification from "../../../../hooks/useNotification";

interface props {
  open: boolean;
  onClose: () => void;
  Data?: equipe | null;
}

export function DialogActionMembroEquipe({ open, onClose, Data }: props) {
  const [participantes, setParticipantes] = useState<participante[]>([]);
  const [participanteSelected, setParticipanteSelected] = useState<
    participante | undefined
  >(undefined);

  const [equipe, setEquipe] = useState<equipe>({
    nome: "",
  });

  const showNotification = useNotification();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data_ = {
      equipe_id_reference: equipe.equipe_id,
      participante_id_referente: participanteSelected?.participante_id,
      lider: false,
    };

    console.log(equipe);

    if (participanteSelected != undefined) {
      postMembroEquipe(data_)
        .then(() => {
          showNotification({
            type: "success",
            title: "Sucesso ao adicionar a Membro na Equipe.",
            message: "Membro adicionado com sucesso.",
          });
          onClose();
          window.location.reload();
        })
        .catch((err) => {
          showNotification({
            type: "error",
            title: "Erro ao adicionar Membro na Equipe.",
            message: "Membro não adicionado. " + err?.response?.data?.message,
          });
        });
    } else {
      showNotification({
        type: "warning",
        message: "Selecione o participante.",
        title: "Participante não selecionado",
      });
    }
  };

  async function getParticipantesList() {
    await getParticipantes(0, "*")
      .then((res) => {
        setParticipantes(res.data.participantes.participantes);
      })
      .catch((err) => {
        showNotification({
          type: "error",
          message:
            "Erro obter lista de participantes. " +
            err?.response?.data?.message,
          title: "Erro ao obter lista",
        });
      });
  }

  useEffect(() => {
    if (Data) {
      setEquipe(Data);
    }
    getParticipantesList();
  }, [Data]);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Box
          width={{ sm: "340px", md: "480px", lg: "600" }}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <DialogTitle>{`Adicionar Membro de Equipe`}</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            <form onSubmit={handleSubmit}>
              <Box display={"flex"} flexDirection={"column"} gap={2} py={2}>
                <FormControl>
                  <Autocomplete
                    value={participanteSelected}
                    disablePortal
                    fullWidth
                    size="small"
                    options={participantes}
                    getOptionLabel={(option: participante) => option.nome}
                    renderInput={(params) => (
                      <TextField {...params} label="Selecione o participante" />
                    )}
                    onChange={(event: any, value: participante | null) => {
                      event.preventDefault();
                      setParticipanteSelected(value ? value : undefined);
                    }}
                  />
                </FormControl>
              </Box>
              <DialogActions>
                <Box
                  display={"flex"}
                  gap={2}
                  width={"100%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Button variant="contained" color="error" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button variant="contained" color="success" type="submit">
                    Salvar
                  </Button>
                </Box>
              </DialogActions>
            </form>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
}
