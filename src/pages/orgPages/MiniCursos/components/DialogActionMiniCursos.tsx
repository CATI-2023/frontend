import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  mini_curso,
  participantesList,
  participantes,
} from "../../../../Types/type";
import { useFetch } from "../../../../hooks/useFetch";
import { postMiniCurso, putMiniCurso } from "../../../../services/miniCursos";
import useNotification from "../../../../hooks/useNotification";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface props {
  open: boolean;
  onClose: () => void;
  Data?: mini_curso | null;
}

export function DialogActionMiniCursos({ open, onClose, Data }: props) {
  const { data: ministrantes } = useFetch<participantesList>("participantes");
  const [mini_curso, setMini_curso] = useState<mini_curso>({
    data: "",
    descricao: "",
    evento_id_reference: 0,
    ministrante_participante_id_reference: 0,
    titulo: "",
    valor: 0,
    qtde_vagas: 0,
    ministrante: {
      nome: "",
      participante_id: 0,
    },
  });
  const [ministrante_id, setMinistrante_id] = useState<number | undefined>(0);
  const showNotification = useNotification();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data_ = {
      data: new Date(mini_curso.data).toISOString(),
      descricao: mini_curso.descricao,
      ministrante_participante_id_reference: ministrante_id,
      titulo: mini_curso.titulo,
      valor: Number(mini_curso.valor),
      qtde_vagas: mini_curso.qtde_vagas,
      evento_id_reference: 1,
    };
    if (Data) {
      if (ministrante_id != undefined) {
        await putMiniCurso(Data.minicurso_id, data_)
          .then((res) => {
            showNotification({
              type: "success",
              title: "Sucesso ao editar o mini-curso" + res,
              message: "Mini-curso editado com sucesso",
            });
            onClose();
            setTimeout(() => {
              window.location.reload();
            }, 500);
          })
          .catch((err) => {
            showNotification({
              type: "error",
              title: "Erro ao editar o mini-curso",
              message: "Mini-curso não editado" + err,
            });
          });
      } else {
        showNotification({
          type: "error",
          title: "Erro ao editar o mini-curso",
          message: "Ministrante não selecionado",
        });
      }
      console.log(mini_curso.data);
      // console.log(Data.ministrante?.participante_id)
      // console.log(data_);
    } else {
      postMiniCurso(data_)
        .then((res) => {
          showNotification({
            type: "success",
            title: "Sucesso ao adicionar o mini-curso" + res,
            message: "Mini-curso adicionado com sucesso",
          });
          onClose();
          setTimeout(() => {
            window.location.reload();
          }, 500);
        })
        .catch((err) => {
          showNotification({
            type: "error",
            title: "Erro ao adicionar o mini-curso",
            message: "Mini-curso não adicionado" + err,
          });
        });
    }
  };

  useEffect(() => {
    if (Data) {
      setMini_curso(Data);
      setMinistrante_id(Data.ministrante?.participante_id);
    }
  }, [Data]);
  // console.log(mini_curso.ministrante_participante_id_reference);
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Box
          width={{ sm: "340px", md: "480px", lg: "600" }}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <DialogTitle sx={{ textAlign: "center" }}>
            {Data != null ? "Editar mini-curso" : "Adicionar mini-curso"}
          </DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            <form onSubmit={handleSubmit}>
              <Box display={"flex"} flexDirection={"column"} gap={2} py={2}>
                <TextField
                  label="Título"
                  value={mini_curso.titulo}
                  fullWidth
                  onChange={(event) => {
                    setMini_curso({
                      ...mini_curso,
                      titulo: event?.target?.value,
                    });
                  }}
                />
                <TextField
                  label="Descrição"
                  value={mini_curso.descricao}
                  onChange={(event) => {
                    setMini_curso({
                      ...mini_curso,
                      descricao: event?.target?.value,
                    });
                  }}
                  fullWidth
                />
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["year", "month", "day"]}
                    onChange={(event) => {
                      if (typeof event === "string") {
                        setMini_curso({ ...mini_curso, data: event });
                      } else if (event instanceof Date) {
                        const dataCorreta = event.toISOString();
                        setMini_curso({ ...mini_curso, data: dataCorreta });
                      }
                    }}
                  />
                </LocalizationProvider> */}
                <TextField
                  type="number"
                  label="Valor"
                  value={mini_curso.valor}
                  fullWidth
                  onChange={(event) => {
                    setMini_curso({
                      ...mini_curso,
                      valor: parseFloat(event.target.value),
                    });
                  }}
                />
                <TextField
                  type="text"
                  label="Qtde. Vagas"
                  value={mini_curso.qtde_vagas}
                  onChange={(event) => {
                    const numericValue = event.target.value.replace(/[^0-9]/g,'')
                    const numberValue = Number(numericValue)
                    setMini_curso({
                      ...mini_curso,
                      qtde_vagas: numberValue,
                    });
                  }}
                  fullWidth
                />
                <FormControl>
                  <FormLabel>Ministrante</FormLabel>
                  <Select
                    value={ministrante_id}
                    // value={}
                    onChange={(event) => {
                      setMinistrante_id(Number(event.target.value));
                      // console.log(event.target.value);
                    }}
                    fullWidth
                  >
                    {ministrantes?.participantes?.map(
                      (minitrante: participantes) => (
                        <MenuItem value={minitrante.participante_id}>
                          {minitrante.nome + " - " + minitrante.participante_id}
                        </MenuItem>
                      )
                    )}
                  </Select>
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
