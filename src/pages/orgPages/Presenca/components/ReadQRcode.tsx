import { useEffect } from "react";
import QrScanner from "qr-scanner";
export let resultRead = "";
export function QrScannerComponent() {
  useEffect(() => {
    const scannerVideo = document.getElementById("Scanner") as HTMLVideoElement;
    const scanner = new QrScanner(scannerVideo, (result) => {
      onScanSuccess(result);
      scanner.stop();
    });
    scanner.start();
    return () => {
      scanner.stop();
    };
  }, []);

  const onScanSuccess = (result: string | null) => {
    if (result !== null) {
      resultRead = result;
      console.log(result);
    }
  };

  return <video id="Scanner" width={"90%"} height={"auto"}></video>;
}
