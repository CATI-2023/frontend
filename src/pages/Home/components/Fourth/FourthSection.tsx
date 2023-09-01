import { Avatar, Box } from "@mui/material";
import "./style.css";
import { ColaboradorCard } from "./components/Colaborador";
import OpenIaLogo from "../../../../assets/OpenAI_Logo1.png"
import TresCoracoesLogo from "../../../../assets/logo-cafe-3-coracoes.png"
import SpacexLogo from "../../../../assets/spacex1.png"
import MicrosoftLogo from "../../../../assets/Microsoft-Logo.png"
import BombaLogo from "../../../../assets/bomba patch.png"
import GoogleLogo from "../../../../assets/Google_2015_logo.png"
import RedBullLogo from "../../../../assets/Red-Bull-Logo.png"
import SicrediLogo from "../../../../assets/sicredi-logo.svg"
import AppleLogo from "../../../../assets/apple-logo.png"
import UbisoftLogo from "../../../../assets/ubisoft-logo-.png"
import DollyLogo from "../../../../assets/Dolly_logo.png"
import AlfaLogo from "../../../../assets/6694f1b7-0ee5-42d4-982f-9c4b0f2c3a7.png"
import { ButtonInscrevaSe } from "../../../../components/btnIncrevaSe/btnInscrevaSe";
export function FourthSection() {
  return (
    <>
      <Box
        height={"auto"}
        pt={"3em"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        py={"2rem"}
      >
        <p className="primary-text-fourth-section">Colaboradores</p>
        <Box
          display={"grid"}
          gridTemplateColumns={{ xs: "auto", sm: "auto", md: "auto", lg: "auto auto auto", xl: "auto auto auto"}}
          bgcolor={"white"}
          p={"2em"}
          borderRadius={"50px"}
          mt={"1em"}
          mb="1em"
        >
          <ColaboradorCard logo={OpenIaLogo} />
          <ColaboradorCard logo={TresCoracoesLogo}/>
          <ColaboradorCard logo={SpacexLogo}/>
          <ColaboradorCard logo={MicrosoftLogo}/>
          <ColaboradorCard logo={BombaLogo}/>
          <ColaboradorCard logo={GoogleLogo}/>
          <ColaboradorCard logo={RedBullLogo}/>
          <ColaboradorCard logo={SicrediLogo}/>
          <ColaboradorCard logo={AppleLogo}/>
          <ColaboradorCard logo={UbisoftLogo}/>
          <ColaboradorCard logo={DollyLogo}/>
          <ColaboradorCard logo={AlfaLogo}/>
        </Box>
        <ButtonInscrevaSe />
      </Box>
    </>
  );
}
