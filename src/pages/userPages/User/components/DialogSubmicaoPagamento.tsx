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
  idPagamento: number;
}

export function DialogSubmicaoPagamento({ open, onClose, idPagamento }: Props) {
  const showNotification = useNotification();

  const [comprovantePagamento, setComprovantePagamento] = useState<File | null>(
    null
  );

  const handleClose = () => {
    window.location.reload();
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    if (file) {
      setComprovantePagamento(file);
    }
  };

  async function updatePagamento() {
    await putPagamentos(idPagamento, {
      status: "PENDENTE",
      comprovante: "",
      comprovante_pdfFile: comprovantePagamento,
    })
      .then(() => {
        showNotification({
          message: "Comprovante enviado com sucesso.",
          type: "success",
        });
        handleClose;
      })
      .catch(() => {
        showNotification({
          message: "Erro ao enviar comprovante.",
          type: "error",
        });
      });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePagamento();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Anexar</DialogTitle>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <Button color={"error"} variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
