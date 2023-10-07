import { Navbar } from "../../../components/navbar/Navbar";
import { QrScannerComponent, resultRead } from "./components/ReadQRcode";
export function OrganizacaoPresencaPage() {


  return (
    <>
      <Navbar title="Presença" typeUser="Organização" />
      <QrScannerComponent />
      <p>
        {resultRead}
      </p>
    </>
  );
}
