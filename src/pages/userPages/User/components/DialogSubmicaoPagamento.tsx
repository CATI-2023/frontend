import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { putPagamentos } from "../../../../services/pagamentos";
import useNotification from "../../../../hooks/useNotification";

interface Props {
  open: boolean;
  onClose: () => void;
  idParticipante: number;
}

export function DialogSubmicaoPagamento({ open, onClose, idParticipante }: Props) {

  const showNotification = useNotification()

  const [comprovantePagamento, setComprovantePagamento] = useState<string>("");

  const handleClose = () => {
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setComprovantePagamento(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function updatePagamento() {
    await putPagamentos(idParticipante, {
      status: "PENDENTE",
      comprovante_base64: comprovantePagamento,
    }).then(() => {
      showNotification({
        message: "Comprovante enviado com sucesso",
        type: "success"
      })
      handleClose;
    }).catch(() => {
      showNotification({
        message: "Erro ao enviar comprovante",
        type: "error"
      })
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePagamento();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Anexar</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <input
            type="file"
            accept="image/jpg"
            onChange={(e) => {
              handleImageUpload(e);
            }}
          />
        </DialogContent>

        <DialogActions
          sx={{
            p: 2,
          }}
        >
          <Button
            color={"success"}
            onClick={handleClose}
            type="submit"
            variant="contained"
          >
            Enviar
          </Button>
          <Button
            color={"error"}
            variant="outlined"
            onClick={handleClose}
          >
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
