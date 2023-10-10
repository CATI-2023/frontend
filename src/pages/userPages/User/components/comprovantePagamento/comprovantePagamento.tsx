import { Box, Button, Chip } from "@mui/material";
import { useState } from "react";
import { DialogSubmicaoPagamento } from "./components/DialogSubmicaoPagamento";
interface Props {
  estado: "APROVADO" | "PENDENTE" | "RECUSADO";
  imgParticipante: string;
  idParticipante: number;
}
export function ComprovantePagamento({
  estado,
  imgParticipante,
  idParticipante,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  console.log(idParticipante);
  return (
    <>
      <Box
        display="flex"
        flexDirection={{
          xs: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row",
        }}
        alignItems="center"
        justifyContent="space-between"
        m={2}
        gap={2}
      >
        <img src={imgParticipante} height={"200px"} width={"200px"} />
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Chip label={estado} color="warning" sx={{ p: 2,width: "100%" }} />
          <Button
            disabled={estado === "APROVADO"}
            variant="contained"
            onClick={handleOpen}
          >
            Comprovante de pagamento
          </Button>
        </Box>
        <DialogSubmicaoPagamento
          idParticipante={idParticipante}
          open={open}
          onClose={handleClose}
        />
      </Box>
    </>
  );
}
