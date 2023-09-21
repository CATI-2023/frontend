import { Box, Grid, Typography } from "@mui/material";
import { ButtonDefault } from "../../../../components/buttonDefault/btnInscrevaSe";
import cronograma from "./assets/Submissoes_Trabalhos_CATI_2023_Atualizado.pdf";
import { ListItens } from "../../../../components/listItens/listItens";

export function ArtigosSection() {
  let datasImportantes = [
    "Submissão de arquivo do artigo completo: até 20/10/2023",
    "Registro de artigos resumidos: até 12/10/2023",
    "Submissão de arquivo do artigo completo: até 20/10/2023",
    "Registro de artigos resumidos: até 12/10/2023",
    "Submissão de arquivo do artigo resumido: até 22/10/2023",
    "Registro de minicurso: até 12/10/2023",
    "Submissão de arquivo do minicurso: até 22/10/2023",
    "Notificação dos autores (artigos completos, artigos resumidos e minicursos): até 28/10/2023",
    "Envio da versão final dos artigos (completos e resumidos) e minicursos aprovados: até 05/11/2023",
    "Apresentação dos artigos e minicursos: 09 /11/2023",
    "Disponibilização dos anais: a partir de 15/12/2023",
  ];

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={3}
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
        <p className="second-text-second-section">
          As submissões ao CATI podem ser por memarginio de minicursos, artigos
          completos ou artigos resumidos, que devem ser submetidos em formato
          exclusivamente digital (arquivo PDF), através do sistema JEMS (
          <a
            className="second-text-second-section"
            href="https://jems.sbc.org.br"
            style={{ padding: 0 }}
          >
            jems.sbc.org.br
          </a>
          ). Todas as submissões devem obrigatoriamente seguir o modelo para
          publicação de artigos da SBC.
        </p>
        <Grid container marginTop={{ md: "2rem", xs: "1rem" }}>
          <Grid item xs={12} md={6} justifyContent={"center"} marginBottom={{ md: "2rem", xs: "1rem" }}>
            <Typography
              textAlign={"center"}
              fontSize={{
                xs: "1.1rem",
                sm: "1.5rem",
                md: "1.5rem",
                lg: "1.8rem",
                xl: "2.5rem",
              }}
            >
              <h3>
                <u>Datas Importantes</u>
              </h3>
              <ListItens itens={datasImportantes} />
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} marginBottom={{ md: "2rem", xs: "1rem" }}>
            <Typography
              textAlign={"center"}
              fontSize={{
                xs: "1.1rem",
                sm: "1.5rem",
                md: "1.5rem",
                lg: "1.8rem",
                xl: "2.5rem",
              }}
            >
              <h3>
                <u>Links Importantes</u>
              </h3>
            </Typography>
            <Box
              gap={2}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
              marginTop={"2rem"}
            >
              <ButtonDefault
                style={{ padding: "1rem 2rem", width: "60%" }}
                title="Normas para submissão de artigos"
                href={cronograma}
                download={true}
              />
              <ButtonDefault
                style={{ padding: "1rem 2rem", width: "60%" }}
                title="Modelo artigo SBC"
                href={
                  "https://www.sbc.org.br/documentos-da-sbc/summary/169-templates-para-artigos-e-capitulos-de-livros/878-modelosparapublicaodeartigos"
                }
                download={false}
                target="_blank"
              />
              <ButtonDefault
                style={{ padding: "1rem 2rem", width: "60%" }}
                title="Modelo artigo resumido SBC"
                href={
                  "https://www.sbc.org.br/documentos-da-sbc/summary/169-templates-para-artigos-e-capitulos-de-livros/878-modelosparapublicaodeartigos"
                }
                download={false}
                target="_blank"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
