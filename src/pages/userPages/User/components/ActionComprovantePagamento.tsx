import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { InscricaoEvento } from "../../../../Types/type";
import { useState } from "react";
import { DialogSubmicaoPagamento } from "./DialogSubmicaoPagamento";

interface Props {
  open: boolean;
  onClose(): void;
  inscricao: InscricaoEvento | null;
}

export function ActionComprovantePagamento({
  open,
  onClose,
  inscricao,
}: Props) {
  const [openActionComprovantePagamento, setOpenActionComprovantePagamento] =
    useState(false);

  if (!inscricao) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Anexar comprovante de pagamento</DialogTitle>
      <DialogContent>
        <Typography variant="body2" textAlign="center">
          Para confirmar sua inscrição, é necessário enviar o comprovante de
          pagamento.
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
              inscricao.pagamento.comprovante_base64 ||
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
            disabled={inscricao.pagamento.status === "APROVADO"}
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
        idParticipante={inscricao.pagamento_id_reference}
        open={openActionComprovantePagamento}
        onClose={() => {
          setOpenActionComprovantePagamento(false);
          onClose();
        }}
      />
    </Dialog>
  );
}
