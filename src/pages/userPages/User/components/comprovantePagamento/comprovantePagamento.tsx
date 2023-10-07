import { Box, Button } from "@mui/material";
import { useState } from "react";
import { DialogSubmicaoPagamento } from "./components/DialogSubmicaoPagamento";
interface Props {
    estado: "APROVADO" | "PENDENTE" | "RECUSADO";
    imgParticipante: string;
    idParticipante: number ;
}
export function ComprovantePagamento({estado, imgParticipante, idParticipante}:Props) {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  console.log(idParticipante)
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="end"
      >
        <img src={imgParticipante} alt="" height={"100px"} width={"100px"} />
        <Button disabled={estado === "APROVADO"} variant="contained" onClick={handleOpen}>
          Comprovante de pagamento
        </Button>
        <DialogSubmicaoPagamento idParticipante={idParticipante} open={open} onClose={handleClose} />
      </Box>
    </>
  );
}
