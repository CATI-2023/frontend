import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import { QrScannerComponent } from "./ReadQRcode";
import { getInscricaoEvento } from "../../../../services/inscricaoEvento";
import { useEffect, useState } from "react";
import useNotification from "../../../../hooks/useNotification";
import { inscricaoEventoGet } from "../../../../Types/type";
import { createFrequencia } from "../../../../services/frequencia";

interface props {
  openQRCode: boolean;
  onCloseQRCode: () => void;
}

export function DialogActionsQRCode({ openQRCode, onCloseQRCode }: props) {
  const [participante, setParticipante] = useState<inscricaoEventoGet | null>(
    null
  );
  const [resultRead, setResultRead] = useState<string>("");
  const showNotification = useNotification();

  async function getParticipante(inscricao_evento_id: number) {
    await getInscricaoEvento(inscricao_evento_id)
      .then((res) => {
        if (res.data) {
          setParticipante(res.data);
        } else {
          showNotification({
            type: "warning",
            message: "Participante não encontrado",
          });
          setResultRead("");
          onCloseQRCode();
        }
      })
      .catch((err) =>
        showNotification({
          type: "error",
          message:
            "Erro obter lista de participantes. " +
            err?.response?.data?.message,
          title: "Erro ao obter lista",
        })
      );
  }

  async function CreateFrequencia() {
    const data_ = {
      inscricao_evento_id_reference: participante?.inscricao_evento_id,
      data: new Date().toISOString(),
    };
    await createFrequencia(data_)
      .then(() => {
        showNotification({
          type: "success",
          message: "Frequência criada com sucesso.",
        });
        window.location.reload();
      })
      .catch((err) => {
        showNotification({
          type: "error",
          message:
            "Erro ao cadastrar Frequência. " + err?.response?.data?.message,
        });
      });
  }

  const HandleCloseQRCode = (event: React.FormEvent) => {
    event.preventDefault();
    setResultRead("");
    onCloseQRCode();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    CreateFrequencia();
  };

  useEffect(() => {
    if (resultRead && resultRead !== null) {
      getParticipante(Number(resultRead?.split("-")[2]));
    } else {
      setParticipante(null);
      setResultRead("");
    }
  }, [resultRead]);

  return (
    <>
      <Dialog open={openQRCode} onClose={onCloseQRCode} maxWidth="lg">
        <Box
          width={{ sm: "340px", md: "480px", lg: "600" }}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <DialogTitle>Leitura de QRCode</DialogTitle>
          {!resultRead || resultRead == null ? (
            <>
              <DialogContent sx={{ width: "100%", textAlign: "center" }}>
                <QrScannerComponent setResultRead={setResultRead} />
              </DialogContent>
            </>
          ) : (
            <>
              <DialogContent sx={{ width: "100%" }}>
                <Box display="flex" flexDirection="column" gap={1} mt={2}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={1}
                  >
                    <Avatar
                      src={participante?.participante?.foto}
                      variant="rounded"
                      sx={{
                        objectFit: "contain",
                        width: 250,
                        height: 250,
                      }}
                    />
                  </Box>
                  <Divider
                    sx={{
                      mt: 2,
                      mb: 2,
                    }}
                  >
                    Dados do Participante
                  </Divider>
                  <TextField
                    fullWidth
                    required
                    value={participante?.participante?.nome}
                    size="small"
                  />
                  <TextField
                    fullWidth
                    required
                    value={new Date().toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                    size="small"
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Box
                  display={"flex"}
                  gap={2}
                  width={"100%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Button
                    variant="contained"
                    color="error"
                    onClick={HandleCloseQRCode}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                  >
                    Salvar
                  </Button>
                </Box>
              </DialogActions>
            </>
          )}
        </Box>
      </Dialog>
    </>
  );
}
