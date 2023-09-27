import { Box } from "@mui/material";
import "./style.css";
import { ColaboradorCard } from "./components/Colaborador";
import JZStore from "./colaboradores/JZ_Store.jpeg";
import KikoTecnologia from "./colaboradores/KIKO_tecnologia.png";
import ParadiseOutlet from "./colaboradores/Paradise_Outlet.jpg";
import ReiCapinhas from "./colaboradores/Rei_das_capinhas.jpg";
import SteakHouse from "./colaboradores/SL_STEAK_HOUSE.png";

export function FourthSection() {
  return (
    <>
      <Box
        // height={"auto"}
        pt={"3em"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        py={"2rem"}
        className="background-colaboradores-section"
      >
        <p className="primary-text-fourth-section">Colaboradores</p>
        <Box
          // display={"grid"}
          gridTemplateColumns={{ xs: "auto", sm: "auto", md: "auto", lg: "auto auto auto", xl: "auto auto auto"}}
          bgcolor={"white"}
          p={"2em"}
          borderRadius={"50px"}
          mt={"1em"}
          mb="1em"
          display={{ xs: "none", md: "grid" }}
        >
          <ColaboradorCard logo={KikoTecnologia} />
          <ColaboradorCard logo={JZStore}/>
          <ColaboradorCard logo={ParadiseOutlet}/>
          <ColaboradorCard logo={ReiCapinhas}/>
          <ColaboradorCard logo={SteakHouse}/>
          <ColaboradorCard logo={KikoTecnologia} />
          <ColaboradorCard logo={JZStore}/>
          <ColaboradorCard logo={ParadiseOutlet}/>
          <ColaboradorCard logo={ReiCapinhas}/>
          <ColaboradorCard logo={SteakHouse}/>
          <ColaboradorCard logo={KikoTecnologia} />
          <ColaboradorCard logo={JZStore}/>
        </Box>
        <Box
          // display={"grid"}
          gridTemplateColumns={{ xs: "auto", sm: "auto", md: "auto", lg: "auto auto auto", xl: "auto auto auto"}}
          bgcolor={"white"}
          p={"1em"}
          borderRadius={"50px"}
          m={"1em 1em"}
          display={{ xs: "grid", md: "none" }}
        >
          <ColaboradorCard logo={KikoTecnologia} />
          <ColaboradorCard logo={JZStore}/>
          <ColaboradorCard logo={ParadiseOutlet}/>
          <ColaboradorCard logo={ReiCapinhas}/>
          <ColaboradorCard logo={SteakHouse}/>
        </Box>
      </Box>
    </>
  );
}
