import { Box } from "@mui/material";
import { FirstSection } from "./components/FirstSection/FirstSection";
import { Header } from "../../components/Header";
import { SecondSection } from "./components/SecondSection/SecondSection";
import { ThirdSection } from "./components/ThirdSection/ThirdSection";
import { FourthSection } from "./components/Fourth/FourthSection";
import { FifthSection } from "./components/Fifth/Fifth";
export function HomePage() {
  return (
    <>
      <Box height={"100vh"}>
        <Header />
        <FirstSection/>
        <SecondSection />
        <ThirdSection />
        <FourthSection />
        <FifthSection />
      </Box>
    </>
  );
}
