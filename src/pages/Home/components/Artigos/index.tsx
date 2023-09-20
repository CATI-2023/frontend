import { Box, Typography } from "@mui/material";
import { ButtonDefault } from "../../../../components/buttonDefault/btnInscrevaSe";
import cronograma from "./assets/Submissoes_Trabalhos_CATI_2023_Atualizado.pdf";

export function ArtigosSection() {
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={4}
        height={"100vh"}
      >
        <Typography
          fontSize={{
            xs: "1.1rem",
            sm: "1.5rem",
            md: "1.5rem",
            lg: "1.8rem",
            xl: "2.5rem",
          }}
        >
          <h1>Artigos</h1>
        </Typography>
        <Box
          gap={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <ButtonDefault
            title="Normas para submissão de artigos"
            href={cronograma}
            download={true}
          />
          <ButtonDefault
            title="Modelo artigo SBC"
            href={
              "https://www.sbc.org.br/documentos-da-sbc/summary/169-templates-para-artigos-e-capitulos-de-livros/878-modelosparapublicaodeartigos"
            }
            download={false}
            target="_blank"
          />
        </Box>
      </Box>
    </>
  );
}
