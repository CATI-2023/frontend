import { Box } from "@mui/material";
import "./style.css";
import { ColaboradorCard } from "./components/Colaborador";
import { CaccLogo } from "../../../../assets/CaccLogo";
import { colaboradoresIndex } from "../../../../Types/type";
import { getApoiadoresIndex } from "../../../../services/apoiadores";
import { useEffect, useState } from "react";

export function FourthSection() {
  const [apoiadores, setApoiadores] = useState<colaboradoresIndex[] | null>(
    null
  );
  const apiHostBase = import.meta.env.VITE_API_URL as string;

  async function getPatrocinadores() {
    getApoiadoresIndex().then((res) => {
      setApoiadores(res.patrocinadores);
    });
  }

  useEffect(() => {
    if (apoiadores === null) {
      getPatrocinadores();
    }
  });

  return (
    <>
      <Box
        // height={"auto"}
        id="fourthSection"
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
        {apoiadores && apoiadores.length > 0 ? (
          <>
            {" "}
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
              {apoiadores?.map((c, idx) => (
                <ColaboradorCard
                  logo={apiHostBase + "/download?file=" + c.banner}
                  key={idx}
                  colaboradorTitle={c.razao_social}
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
              {apoiadores?.map((c, idx) => (
                <ColaboradorCard
                  logo={apiHostBase + "/download?file=" + c.banner}
                  key={idx}
                  colaboradorTitle={c.razao_social}
                />
              ))}
            </Box>
          </>
        ) : (
          <>
            <CaccLogo />
          </>
        )}
      </Box>
    </>
  );
}
