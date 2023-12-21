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
import { competicao, equipe } from "../../../../../Types/type";
import { postEquipe } from "../../../../../services/equipes";
import { getCompeticoesOpen } from "../../../../../services/competicoes";
import useNotification from "../../../../../hooks/useNotification";
import { DefaultsIcons } from "../../../../../constants/DefaultIcons";

interface props {
  participante: number;
  open: boolean;
  onClose: () => void;
}

type Status = "APROVADO" | "PENDENTE" | "RECUSADO";

export function DialogActionEquipes({ open, onClose, participante }: props) {
  const [competicoes, setCompeticoes] = useState<competicao[]>([]);
  const [competicaoSelected, setCompeticaoSelected] = useState<
    competicao | undefined
  >(undefined);
  const [equipe, setEquipe] = useState<equipe>({
    nome: "",
  });
  const showNotification = useNotification();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data_ = {
      nome: equipe.nome,
      competicao_id_reference: competicaoSelected?.competicao_id,
      pagamento_id_reference: 0,
      participante_id_reference: participante,
      pagamento: {
        status: "PENDENTE" as Status,
        comprovante: "",
      },
    };

    if (competicaoSelected != undefined) {
      postEquipe(data_)
        .then(() => {
          showNotification({
            type: "success",
            title: "Sucesso ao adicionar a Equipe.",
            message: "Equipe inscrita com sucesso.",
          });
          onClose();
          window.location.reload();
        })
        .catch((err) => {
          showNotification({
            type: "error",
            title: "Erro ao adicionar a Equipe.",
            message: "Equipe não inscrita. " + err?.response?.data?.message,
          });
        });
    }
  };

  async function getCompeticaoList() {
    await getCompeticoesOpen()
      .then((res) => {
        setCompeticoes(res.competicoes);
      })
      .catch((err) => {
        showNotification({
          type: "error",
          message:
            "Erro obter lista de competições. " + err?.response?.data?.message,
          title: "Erro ao obter lista",
        });
      });
  }

  const apiHostBase = import.meta.env.VITE_API_URL as string;

  const abrirRegulamento = () => {
    if (competicaoSelected !== undefined) {
      window.open(
        apiHostBase + "/download?file=" + competicaoSelected.regulamento
      );
    }
  };

  useEffect(() => {
    getCompeticaoList();
  }, []);

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
          <DialogTitle>{`Inscrever Equipe`}</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            <form onSubmit={handleSubmit}>
              <Box display={"flex"} flexDirection={"column"} gap={2} py={2}>
                <FormControl>
                  <Autocomplete
                    value={competicaoSelected}
                    disablePortal
                    fullWidth
                    size="small"
                    options={competicoes}
                    getOptionLabel={(option: competicao) => option.titulo}
                    renderInput={(params) => (
                      <TextField {...params} label="Selecione a competição" />
                    )}
                    onChange={(event: any, value: competicao | null) => {
                      event.preventDefault();
                      setCompeticaoSelected(value ? value : undefined);
                    }}
                  />
                </FormControl>
                <Box display={"flex"} flexDirection={"column"} gap={2}>
                  <Button
                    disabled={competicaoSelected == undefined}
                    variant="contained"
                    sx={{ display: "flex" }}
                    onClick={() => {
                      abrirRegulamento();
                    }}
                    color="info"
                  >
                    <DefaultsIcons.ExportPdfIcon size={26} />
                    Abrir Regulamento
                  </Button>
                </Box>
                <Box display={"flex"} flexDirection={"column"} gap={2}>
                  <TextField
                    required
                    size="small"
                    label="Nome da Equipe"
                    value={equipe.nome}
                    fullWidth
                    onChange={(event) => {
                      setEquipe({
                        ...equipe,
                        nome: event?.target?.value,
                      });
                    }}
                  />
                </Box>
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
