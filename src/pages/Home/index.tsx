import { Box } from "@mui/material";
import "./style.css";
import { FirstSection } from "./components/FirstSection/FirstSection";
import { SecondSection } from "./components/SecondSection/SecondSection";
import { ThirdSection } from "./components/ThirdSection/ThirdSection";
import { FourthSection } from "./components/Fourth/FourthSection";
import { FifthSection } from "./components/Fifth/Fifth";
import { Footer } from "../../components/Footer";
import { ArtigosSection } from "./components/Artigos";
import { JogosSection } from "./components/Jogos";
import BackToTop from "../../components/GoTopButton";

export function HomePage() {
  return (
    <>
      <Box height={"100vh"}>
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <ArtigosSection />
        <JogosSection />
        <FourthSection />
        <FifthSection />
        <Footer />
        <BackToTop />
      </Box>
    </>
  );
}
