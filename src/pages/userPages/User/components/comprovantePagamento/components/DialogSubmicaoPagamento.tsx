import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { putPagamentos } from "../../../../../../services/pagamentos";

interface Props {
  open: boolean;
  onClose: () => void;
  idParticipante: number;
}

export function DialogSubmicaoPagamento({ open, onClose, idParticipante }: Props) {
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
        // setData({ ...data, foto: "aaaaaaaa" });
      };
      reader.readAsDataURL(file);
    }
  };
  async function updatePagamento() {
    await putPagamentos(idParticipante, {
      status: "PENDENTE",
      comprovante_base64: String(comprovantePagamento),
    }).then((response) => {
      alert(response.status);
    });
  }
  console.log(comprovantePagamento);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePagamento();
    console.log("enviar");
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enviar Comprovante de Pagamento</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/jpg "
              onChange={(e) => {
                handleImageUpload(e);
              }}
            />

            <DialogActions>
              <Button color={"success"} onClick={handleClose} type="submit">
                Enviar
              </Button>
              <Button color={"error"} onClick={handleClose}>
                Cancelar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
