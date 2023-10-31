import { useEffect } from "react";
import QrScanner from "qr-scanner";
import useNotification from "../../../../hooks/useNotification";

interface props {
  setResultRead: React.Dispatch<React.SetStateAction<string>>;
}

export function QrScannerComponent({ setResultRead }: props) {
  const showNotification = useNotification();

  useEffect(() => {
    const scannerVideo = document.getElementById("Scanner") as HTMLVideoElement;
    const scanner = new QrScanner(scannerVideo, (result) => {
      if (result && validateResult(result)) {
        onScanSuccess(result);
        scanner.stop();
      } else {
        showNotification({
          type: "error",
          message: "QR Code inválido.",
        });
      }
    });
    scanner.start();
    return () => {
      scanner.stop();
    };
  }, []);

  function validateResult(r: string) {
    let value = r.split("-");
    if (value[0] !== "cati2023") return false;
    if (value[1] !== "participante") return false;
    if (isNaN(Number(value[2]))) return false;
    return true;
  }

  const onScanSuccess = (result: string | null) => {
    if (result !== null) {
      setResultRead(result);    }
  };

  return <video id="Scanner" width={"90%"} height={"auto"}></video>;
}
