import { Box, Grid } from "@mui/material";
import "./style.css";
// import { Palestrante } from "./components/palestrante";
import { PalestranteCard } from "./components/palestranteCard";
import FotoDhyego from "../../../../assets/palestrantesPhotos/Dhyego.jpeg";
import FotoAlessandro from "../../../../assets/palestrantesPhotos/Alessandro.jpeg";
import FotoJoatham from "../../../../assets/palestrantesPhotos/Joatham.jpg";
import FotoNathan from "../../../../assets/palestrantesPhotos/Nathan_Turra.jpeg";
import FotoKembolle from "../../../../assets/palestrantesPhotos/kembolle.jpeg";
import FotoRicardoGermano from "../../../../assets/palestrantesPhotos/Ricardo-Germano.jpeg";
import FotoSilvana from "../../../../assets/palestrantesPhotos/Silvana-Copceski.jpeg";
import FotoAlexandre from "../../../../assets/palestrantesPhotos/Alexandre_Leopoldo.jpg";
import FotoLuciano from "../../../../assets/palestrantesPhotos/Luciano-Wolski.jpeg";
import FotoDebora from "../../../../assets/palestrantesPhotos/Debora-Camacho.jpeg";
import ClesioSLS from "../../../../assets/palestrantesPhotos/Clesio-SLS.jpeg";

const palestrantes = [
  {
    atuacao:
      "Pós-graduado em Direito Processual Civil, MBA em Gestão de Cooperativas, MBA em Agronegócio e Advogado associado na Sales & Advogados Associados, SLS, Brasil",
    nome: "Clésio Plates",
    tema: "Lei Geral de Proteção de Dados Pessoais (LGPD): Uma abordagem jurídica",
    foto: ClesioSLS,
    lattes: "http://lattes.cnpq.br/2127243847277413",
    linkedin: "",
  },
  {
    atuacao: "Professor Associado do Departamento de Computação - UFSC",
    nome: "Alexandre Leopoldo Gonçalves",
    tema: "Uma Introdução sobre Retrieval Augmented Generation",
    foto: FotoAlexandre,
    lattes: "http://lattes.cnpq.br/5138758521691630",
    linkedin: "",
  },
  {
    atuacao: "Professor Efetivo - UNEMAT",
    nome: "Luciano Wolski",
    tema: "Modelo de Classificação de Patentes",
    foto: FotoLuciano,
    lattes: "http://lattes.cnpq.br/1030012611007949",
    linkedin: "",
  },
  {
    atuacao:
      "Advogada, Empreendedora, Empresária, Encarregada de dados, Consultora Jurídica, Professora Assistente (UNEMAT)",
    nome: "Déborah Barbosa Camacho",
    tema: "LGPD para a IA",
    foto: FotoDebora,
    lattes: "http://lattes.cnpq.br/1267858361014842",
    linkedin: "",
  },
  {
    atuacao: "CEO - Zeus Tecnologia - Cuiabá - Isaac Póvoas",
    nome: "Nathan Turra Rodrigues",
    tema: "Empreendendo no mercado de trabalho",
    foto: FotoNathan,
    lattes: "",
    linkedin: "",
  },
  {
    atuacao: "Diretor de TI da UNEMAT",
    nome: "Dhyego Silva Domingos Brandão",
    tema: "IA e a Gestão de TI voltada para as pessoas",
    foto: FotoDhyego,
    lattes: "http://lattes.cnpq.br/1506276795951919",
    linkedin: "",
  },
  {
    atuacao: "Servidor da UNEMAT",
    nome: "Alessandro Costa Ribeiro",
    tema: "Inteligência artificial aplicada ao turismo inteligente",
    foto: FotoAlessandro,
    lattes: "http://lattes.cnpq.br/8178783515512591",
    linkedin: "",
  },
  {
    atuacao: "Especialista técnico em redes na LogLab",
    nome: "Ricardo Alexandre Germano de Assis",
    tema: "Qual o papel da inteligência artificial (IA) na segurança cibernética",
    foto: FotoRicardoGermano,
    lattes: "",
    linkedin:
      "https://www.linkedin.com/in/ricardo-alexandre-germano-de-assis-b42ab13a/",
  },
  {
    atuacao: "Assessor Especial - Ministério Público Do Estado De Mato Grosso",
    nome: "Kembolle Amilkar de Oliveira",
    tema: "Reflexos da IA na cibersegurança",
    foto: FotoKembolle,
    lattes: "http://lattes.cnpq.br/5682787427593454",
    linkedin: "https://www.linkedin.com/in/kembolle/",
  },
  {
    atuacao:
      "Coordenadora Geral de Popularização da ciência Tecnologia e Inovação - CGPC",
    nome: "Silvana Copceski Stoinski",
    tema: "O uso da tecnologia no ambiente escolar para o ensino de matemática",
    foto: FotoSilvana,
    lattes: "http://lattes.cnpq.br/0414683530829380",
    linkedin: "",
  },
  {
    atuacao:
      "Gerente de Segurança - IFTO / Analista de Segurança - 4linux / Mestre em Sistemas e Computação / Ethical Hacker / Forensic Investigator",
    nome: "Joatham Pedro",
    tema: "Investigação Forense Potencializada por IA: Desvendando Casos Periciais",
    foto: FotoJoatham,
    lattes: "http://lattes.cnpq.br/5005535261910787",
    linkedin: "",
  },
];

export function ThirdSection() {
  return (
    <>
      <Box
        height={"auto"}
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        p={"4em 0"}
        className="background-third-section"
      >
        <h3 className="primary-text-second-section">Palestrantes</h3>
        <Grid container justifyContent={"center"} justifyItems={"center"}>
          {palestrantes.map((p, idx) => (
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
              key={idx}
            >
              <PalestranteCard
                atuacao={p.atuacao}
                nome={p.nome}
                tema={p.tema}
                foto={p.foto}
                lattes={p.lattes}
                linkedin={p.linkedin}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
