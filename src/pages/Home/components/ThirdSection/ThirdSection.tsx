import { Box, Grid } from "@mui/material";
import "./style.css";
// import { Palestrante } from "./components/palestrante";
import { PalestranteCard } from "./components/palestranteCard";
import Circuitoipresso from "../../../../assets/CircuitosImpressos.png";
import FotoDhyego from "./palestrantesPhotos/Dhyego.jpeg";
import FotoAlessandro from "./palestrantesPhotos/Alessandro.jpeg";
import FotoRafaelAruca from "./palestrantesPhotos/Rafael_Aruca.jpeg";
import FotoNathan from "./palestrantesPhotos/Nathan_Turra.jpeg";
import FotoKembolle from "./palestrantesPhotos/kembolle.jpeg";
import FotoRicardoGermano from "./palestrantesPhotos/Ricardo-Germano.jpeg";
import FotoSilvana from "./palestrantesPhotos/Silvana-Copceski.jpeg";
import FotoAlexandre from "./palestrantesPhotos/Alexandre_Leopoldo.jpg";
import FotoLuciano from "./palestrantesPhotos/Luciano-Wolski.jpeg";
import FotoDebora from "./palestrantesPhotos/Debora-Camacho.jpeg";

export function ThirdSection() {
  return (
    <>
      <Box
        height={"auto"}
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        p={"4em 0"}
        style={{
          background: `url(${Circuitoipresso})  100% / cover no-repeat`,
          flexShrink: 0,
        }}
      >
        <h3 className="primary-text-second-section">Palestrantes</h3>
        {/* <Box
          display={"grid"}
          gridTemplateColumns={"auto auto"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
          justifyItems={"center"}
          width={"100%"}
        > */}
        {/* <Palestrante atuacao="atuacao" nome="nome" tema="tema" foto={FotoDhyego} lattes="lattes"/>
          <Palestrante atuacao="atuacao" nome="nome" tema="tema" foto={FotoDhyego} lattes="lattes"/>
          <Palestrante atuacao="atuacao" nome="nome" tema="tema" foto={FotoDhyego} lattes="lattes"/>
          <Palestrante atuacao="atuacao" nome="nome" tema="tema" foto={FotoDhyego} lattes="lattes"/>
          <Palestrante atuacao="atuacao" nome="nome" tema="tema" foto={FotoDhyego} lattes="lattes"/>
          <Palestrante atuacao="atuacao" nome="nome" tema="tema" foto={FotoDhyego} lattes="lattes"/> */}
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            xl={4}
            display={"flex"}
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"center"}
            justifyItems={"center"}
          >
            <PalestranteCard
              atuacao="Diretor de TI da UNEMAT"
              nome="Dhyego Silva Domingos Brandão"
              tema="IA e a Gestão de TI voltada para as pessoas"
              foto={FotoDhyego}
              lattes="http://lattes.cnpq.br/1506276795951919"
              linkedin=""
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            xl={4}
            display={"flex"}
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"center"}
            justifyItems={"center"}
          >
            <PalestranteCard
              atuacao="Servidor da UNEMAT"
              nome="Alessandro Costa Ribeiro"
              tema="Inteligência artificial aplicado ao turismo inteligente"
              foto={FotoAlessandro}
              lattes="http://lattes.cnpq.br/8178783515512591"
              linkedin=""
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            xl={4}
            display={"flex"}
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"center"}
            justifyItems={"center"}
          >
            <PalestranteCard
              atuacao="CEO - Zeus Tecnologia - Cuiabá - Isaac Póvoas"
              nome="Nathan Turra Rodrigues"
              tema="Empreendendo no mercado de trabalho"
              foto={FotoNathan}
              lattes=""
              linkedin=""
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            xl={4}
            display={"flex"}
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"center"}
            justifyItems={"center"}
          >
            <PalestranteCard
              atuacao="atuacao"
              nome="Silvana Copceski Stoinski"
              tema="O uso da tecnologia no ambiente escolar para o ensino de matemática"
              foto={FotoSilvana}
              lattes="http://lattes.cnpq.br/0414683530829380"
              linkedin=""
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            xl={4}
            display={"flex"}
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"center"}
            justifyItems={"center"}
          >
            <PalestranteCard
              atuacao="Diretor Executivo de Inovação da UFSCar e Representante Institucional da UFSCar no CNPq no Programa DAÍ - Doutorado Acadêmico para Inovação"
              nome="Rafael Vidal Aroca"
              tema="Tema da Palestra"
              foto={FotoRafaelAruca}
              lattes="http://lattes.cnpq.br/9262228584082064"
              linkedin=""
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            xl={4}
            display={"flex"}
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"center"}
            justifyItems={"center"}
          >
            <PalestranteCard
              atuacao="Atuação"
              nome="Ricardo Alexandre Germano de Assis"
              tema="Tema da Palestra"
              foto={FotoRicardoGermano}
              lattes=""
              linkedin="https://www.linkedin.com/in/ricardo-alexandre-germano-de-assis-b42ab13a/"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            xl={4}
            display={"flex"}
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"center"}
            justifyItems={"center"}
          >
            <PalestranteCard
              atuacao="Atuação"
              nome="Kembolle Amilkar de Oliveira"
              tema="Tema da Palestra"
              foto={FotoKembolle}
              lattes="http://lattes.cnpq.br/5682787427593454"
              linkedin="https://www.linkedin.com/in/kembolle/"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            xl={4}
            display={"flex"}
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"center"}
            justifyItems={"center"}
          >
            <PalestranteCard
              atuacao="Advogada, Empreendedora, Empresária, Encarregada de dados, Consultora Jurídica, Professora Assistente (UNEMAT)"
              nome="Déborah Barbosa Camacho"
              tema="LGPD para a IA"
              foto={FotoDebora}
              lattes="http://lattes.cnpq.br/1267858361014842"
              linkedin=""
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            xl={4}
            display={"flex"}
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"center"}
            justifyItems={"center"}
          >
            <PalestranteCard
              atuacao="Atuação"
              nome="Alexandre Leopoldo Gonçalves"
              tema="Tema da Palestra"
              foto={FotoAlexandre}
              lattes="http://lattes.cnpq.br/5138758521691630"
              linkedin=""
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            xl={4}
            display={"flex"}
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"center"}
            justifyItems={"center"}
          >
            <PalestranteCard
              atuacao="Atuação"
              nome="Luciano Wolski"
              tema="Tema da Palestra"
              foto={FotoLuciano}
              lattes="http://lattes.cnpq.br/1030012611007949"
              linkedin=""
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
