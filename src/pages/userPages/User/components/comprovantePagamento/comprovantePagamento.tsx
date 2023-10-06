import { Box, Button } from "@mui/material";
import { useState } from "react";
import { DialogSubmicaoPagamento } from "./components/DialogSubmicaoPagamento";
interface Props {
    estado: "APROVADO" | "PENDENTE" | "RECUSADO";
}
export function ComprovantePagamento({estado}:Props) {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="end"
      >
        <Button disabled={estado === "APROVADO"} variant="contained" onClick={handleOpen}>
          Comprovante de pagamento
        </Button>
        <DialogSubmicaoPagamento open={open} onClose={handleClose} />
      </Box>
    </>
  );
}
