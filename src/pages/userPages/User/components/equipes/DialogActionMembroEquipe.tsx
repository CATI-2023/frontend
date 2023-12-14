import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { equipe, participante } from "../../../../../Types/type";
import { postMembroEquipe } from "../../../../../services/membrosEquipe";
import { getParticipanteByEmail } from "../../../../../services/participantes";
import useNotification from "../../../../../hooks/useNotification";

interface props {
  open: boolean;
  onClose: () => void;
  Data?: equipe | null;
}

export function DialogActionMembroEquipe({ open, onClose, Data }: props) {
  const [participanteSelected, setParticipanteSelected] = useState<
    participante | undefined
  >(undefined);
  const [busca, setBusca] = useState<string>("");
  const [equipe, setEquipe] = useState<equipe>({
    nome: "",
  });

  const showNotification = useNotification();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data_ = {
      equipe_id_reference: equipe.equipe_id,
      participante_id_reference: participanteSelected?.participante_id,
      lider: false,
    };

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

  async function getParticipante() {
    await getParticipanteByEmail(busca)
      .then((res) => {
        if (res.data) {
          setParticipanteSelected(res.data);
        } else {
          setParticipanteSelected(undefined);
          showNotification({
            type: "warning",
            message: "Participante não encontrado. ",
            title: "Participante não encontrado.",
          });
        }
      })
      .catch(() => {
        showNotification({
          type: "error",
          message: "Erro buscar participante. ",
          title: "Erro ao obter participante",
        });
      });
  }

  useEffect(() => {
    if (Data) {
      setEquipe(Data);
    }
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
                <TextField
                  fullWidth
                  placeholder="Email Participante"
                  label="Informe o email do participante"
                  value={busca}
                  onChange={(e) => {
                    setBusca(e.target.value);
                  }}
                  size="small"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => getParticipante()}
                >
                  Buscar
                </Button>
                <TextField
                  fullWidth
                  disabled
                  placeholder="Participante "
                  value={participanteSelected?.nome}
                  size="small"
                />
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
