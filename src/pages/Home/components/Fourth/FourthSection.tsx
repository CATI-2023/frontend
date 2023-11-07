import { Box } from "@mui/material";
import "./style.css";
import { ColaboradorCard } from "./components/Colaborador";
import CNA from "../../../../assets/colaboradores/CNA.png";
import CoelhoMachado from "../../../../assets/colaboradores/COELHO-E-MACHADO.png";
import FENIX from "../../../../assets/colaboradores/FENIX.png";
import FLORINDO from "../../../../assets/colaboradores/FLORINDO-AGROPECUARIA.png";
import JRC from "../../../../assets/colaboradores/JRC.png";
import JZStore from "../../../../assets/colaboradores/JZ_STORE.png";
import KikoTecnologia from "../../../../assets/colaboradores/KIKO.png";
import MercadoConfianca from "../../../../assets/colaboradores/mercado_confianca.png";
import OMEGA from "../../../../assets/colaboradores/OMEGA-SISTEMAS.png";
import ParadiseOutlet from "../../../../assets/colaboradores/Paradise-Outlet.png";
import QUALITY from "../../../../assets/colaboradores/QUALITY.png";
import ReiCapinhas from "../../../../assets/colaboradores/Rei_das_capinhas.png";
import SteakHouse from "../../../../assets/colaboradores/SL_STEAK_HOUSE.png";
import SLS from "../../../../assets/colaboradores/SLS-ADVOGADOS.png";
import TGASistemas from "../../../../assets/colaboradores/TGA-SISTEMAS.png";
import TOPInformatica from "../../../../assets/colaboradores/TOP-INFORMATICA.png";
import Waser from "../../../../assets/colaboradores/waser_tecnologia.png";
import Sabre from "../../../../assets/colaboradores/SABRE.png";
import Branco from "../../../../assets/colaboradores/BRANCO-MOVEIS-PLANEJADOS.png";

const colaboradores = [
  {
    logo: KikoTecnologia,
    heightPhoto: "auto",
    widthPhoto: "90%",
    colaboradorTitle: "KIKO Tecnologia Agrícola",
  },
  { logo: TGASistemas, colaboradorTitle: "TGA Sistemas" },
  { logo: OMEGA, colaboradorTitle: "OMEGA Sistemas" },
  { logo: QUALITY, colaboradorTitle: "QUALITY Tecnologia" },
  { logo: JRC, colaboradorTitle: "JRC Assessoria & Consultoria" },
  { logo: SLS, colaboradorTitle: "SLS Advogados" },
  { logo: FLORINDO, colaboradorTitle: "Florindo Agro" },
  { logo: CoelhoMachado, colaboradorTitle: "Coelho & Machado - Agropecuária" },
  { logo: TOPInformatica, colaboradorTitle: "TOP Informática" },
  { logo: Waser, colaboradorTitle: "Waser Tecnologia" },
  { logo: FENIX, colaboradorTitle: "Academia Fênix" },
  { logo: SteakHouse, colaboradorTitle: "SL Prime Steak House" },
  { logo: MercadoConfianca, colaboradorTitle: "Supermercado Confiança." },
  { logo: JZStore, colaboradorTitle: "JZ Store" },
  { logo: ParadiseOutlet, colaboradorTitle: "Paradaise Outlet" },
  { logo: ReiCapinhas, colaboradorTitle: "Rei das Capinhas Tangará da Serra" },
  { logo: CNA, colaboradorTitle: "CNA Barra do Bugres" },
  { logo: Sabre, colaboradorTitle: "Sabre Construtora" },
  { logo: Branco, colaboradorTitle: "Branco Móveis" },
];

export function FourthSection() {
  return (
    <>
      <Box
        // height={"auto"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        py={"2rem"}
        className="background-colaboradores-section"
      >
        <p className="primary-text-second-section" style={{ margin: "2rem 0" }}>
          Colaboradores
        </p>
        <Box
          // display={"grid"}
          gridTemplateColumns={{
            xs: "auto",
            sm: "auto",
            md: "auto",
            lg: "auto auto auto",
            xl: "auto auto auto",
          }}
          bgcolor={"white"}
          padding={"2em"}
          borderRadius={"50px"}
          margin={"2em 0"}
          display={{ xs: "none", md: "grid" }}
        >
          {colaboradores.map((c, idx) => (
            <ColaboradorCard
              logo={c.logo}
              widthPhoto={c.widthPhoto}
              heightPhoto={c.heightPhoto}
              key={idx}
            />
          ))}
        </Box>
        <Box
          // display={"grid"}
          gridTemplateColumns={{
            xs: "auto",
            sm: "auto",
            md: "auto",
            lg: "auto auto auto",
            xl: "auto auto auto",
          }}
          bgcolor={"white"}
          p={"1em"}
          borderRadius={"30px"}
          m={"1em 1em"}
          display={{ xs: "grid", md: "none" }}
        >
          {colaboradores.map((c, idx) => (
            <ColaboradorCard
              logo={c.logo}
              widthPhoto={c.widthPhoto}
              heightPhoto={c.heightPhoto}
              key={idx}
              colaboradorTitle={c.colaboradorTitle}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}
