import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { QrScannerComponent, resultRead } from "./ReadQRcode";

interface props {
  open: boolean;
  onClose: () => void;
}

export function DialogActionsQRCode({ open, onClose }: props) {
  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <Box
          width={{ sm: "340px", md: "480px", lg: "600" }}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <DialogTitle>Leitura de QRCode</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            <QrScannerComponent />
            {resultRead}
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
}
