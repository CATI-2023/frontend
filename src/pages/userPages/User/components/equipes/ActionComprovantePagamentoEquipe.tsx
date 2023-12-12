import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { equipe } from "../../../../../Types/type";
import { useState } from "react";
import { DialogSubmicaoPagamento } from "../DialogSubmicaoPagamento";

interface Props {
  open: boolean;
  onClose(): void;
  equipe: equipe | null;
}

export function ActionComprovantePagamentoEquipe({
  open,
  onClose,
  equipe,
}: Props) {
  const [openActionComprovantePagamento, setOpenActionComprovantePagamento] =
    useState(false);

  if (!equipe) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Anexar comprovante de pagamento</DialogTitle>
      <DialogContent>
        <Typography variant="body2" textAlign="center">
          Para confirmar a inscrição da equipe, é necessário enviar o
          comprovante de pagamento.
        </Typography>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
          mt={3}
        >
          <img
            src={
              equipe.pagamento?.comprovante_base64 ||
              "https://via.placeholder.com/200x200.png?text=Comprovante+de+pagamento"
            }
            height={"200px"}
            width={"200px"}
            style={{
              objectFit: "contain",
              border: "1px solid #ccc",
            }}
          />
          <Button
            disabled={equipe.pagamento?.status === "APROVADO"}
            variant="contained"
            onClick={() => {
              setOpenActionComprovantePagamento(true);
            }}
          >
            Enviar comprovante
          </Button>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          p: 2,
        }}
      >
        <Button variant="outlined" color="info" onClick={onClose}>
          Fechar
        </Button>
      </DialogActions>

      <DialogSubmicaoPagamento
        idPagamento={equipe.pagamento_id_reference || 0}
        open={openActionComprovantePagamento}
        onClose={() => {
          setOpenActionComprovantePagamento(false);
          onClose();
        }}
      />
    </Dialog>
  );
}
