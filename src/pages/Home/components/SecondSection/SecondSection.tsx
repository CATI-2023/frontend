import { Box } from "@mui/material";
import "./style.css";
import { ButtonInscrevaSe } from "../../../../components/btnIncrevaSe/btnInscrevaSe";
export function SecondSection() {
  return (
    <>
      <Box
        className="background-second-section"
        display={"flex"}
        height={{
          xs: "auto",
          sm: "auto",
          md: "100vh",
          lg: "110vh",
          xl: "110vh",
        }}
        pt={{ xs: "2rem", sm: "2rem", md: "2rem", lg: "2rem", xl: "4rem" }}
        pb={{ xs: "2rem", sm: "2rem" }}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        gap={4}
      >
        <h3 className="primary-text-second-section">O que é o evento?</h3>
        <p className="second-text-second-section">
          O Centro Acadêmico de Computação (CATI) uma instituição renomada e
          ativa no ambiente acadêmico, está preparando um evento empolgante e
          inovador focado no campo da Inteligência Artificial (IA) . Com um
          histórico de promoção de iniciativas educacionais e interativas, o
          CATI mais uma vez se destaca ao trazer à comunidade acadêmica e além
          de um evento que explorará as tendências mais recentes e as aplicações
          em constante evolução da IA. O evento sobre Inteligência Artificial,
          organizado pelo CATI, promete ser uma jornada enriquecedora para
          estudantes, professores, profissionais da área e entusiastas da
          tecnologia. A IA tem se firmado como um dos campos mais
          revolucionários do século XXI, e o CATI reforça a importância de
          manter todos os informados e engajados nesse domínio em constante
          crescimento.
        </p>
        <ButtonInscrevaSe />
      </Box>
    </>
  );
}
