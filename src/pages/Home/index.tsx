import { Box } from "@mui/material";
import { FirstSection } from "./components/FirstSection/FirstSection";
import { Header } from "../../components/Header";
import { SecondSection } from "./components/SecondSection/SecondSection";

export function HomePage() {
  return (
    <>
      <Box height={"100vh"}>
        <Header />
        <FirstSection/>
        <SecondSection />
      </Box>
    </>
  );
}
