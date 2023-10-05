import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import "./style.css";
import { ButtonDefault } from "../../../../components/buttonDefault/btnInscrevaSe";
import cronograma from "./assets/Submissoes_Trabalhos_CATI_2023_Atualizado.pdf";
import { ListItens } from "../../../../components/listItens/listItens";
import { ArrowUp } from "../../../../assets/ArrowUp";

export function ArtigosSection() {
  let datasImportantes = [
    "Registro de artigo completo: até 18/10/2023",
    "Submissão de arquivo do artigo completo: até 22/10/2023",
    "Registro de artigo resumido: até 18/10/2023",
    "Submissão de arquivo do artigo resumido: até 22/10/2023",
    "Registro de minicurso: até 18/10/2023",
    "Submissão de arquivo do minicurso: até 24/10/2023",
    "Notificação dos autores (artigos completos, artigos resumidos e minicursos): até 31/10/2023",
    "Envio da versão final dos artigos (completos e resumidos) e minicursos aprovados: até 05/11/2023",
    "Apresentação dos artigos e minicursos: 09/11/2023",
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
        className="background-artigos-section"
      >
        <p className="primary-text-section">Artigos</p>
        <p className="second-text-second-section">
          As submissões ao CATI podem ser por meio de minicursos, artigos
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
          <Grid
            item
            xs={12}
            md={6}
            justifyContent={"center"}
            marginBottom={{ md: "2rem", xs: "1rem" }}
          >
            <Box margin={"0 1rem"} display={{ xs: "flex", md: "none" }}>
              <Accordion sx={{ width: "100%" }}>
                <AccordionSummary expandIcon={<ArrowUp />}>
                  <Typography>Datas Importantes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ListItens itens={datasImportantes} />
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box display={{ xs: "none", md: "flex" }} flexDirection={"column"}>
              <Typography textAlign={"center"} fontSize={"1.7rem"}>
                <u>Datas Importantes</u>
              </Typography>
              <ListItens itens={datasImportantes} iconColor="white" />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} marginBottom={{ md: "2rem", xs: "1rem" }}>
            <Box margin={"0 1rem"} display={{ xs: "flex", md: "none" }}>
              <Accordion sx={{ width: "100%" }}>
                <AccordionSummary expandIcon={<ArrowUp />}>
                  <Typography>Links Importantes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem>
                      <Link
                        title="Normas para submissão de artigos"
                        href={cronograma}
                        download
                      >
                        Normas para submissão de artigos
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link
                        title="Modelo artigo SBC"
                        href="https://www.sbc.org.br/documentos-da-sbc/summary/169-templates-para-artigos-e-capitulos-de-livros/878-modelosparapublicaodeartigos"
                        target="_blank"
                      >
                        Modelo artigo SBC
                      </Link>
                    </ListItem>
                    {/* <ListItem>
                      <Link
                        title="Modelo artigo resumido SBC"
                        href="https://www.sbc.org.br/documentos-da-sbc/summary/169-templates-para-artigos-e-capitulos-de-livros/878-modelosparapublicaodeartigos"
                        target="_blank"
                      >
                        Modelo artigo resumido SBC
                      </Link>
                    </ListItem> */}
                  </List>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box display={{ xs: "none", md: "flex" }} flexDirection={"column"} textAlign={"center"}>
              <Typography fontSize={"1.7rem"}>
                <u>Links Importantes</u>
              </Typography>
              <Box
                gap={2}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
                marginTop={"1rem"}
              >
                <ButtonDefault
                  style={{
                    marginBottom: "1rem",
                    padding: "1rem 2rem",
                    width: "60%",
                  }}
                  title="Normas para submissão de artigos"
                  href={cronograma}
                  download={true}
                />
                <ButtonDefault
                  style={{
                    marginBottom: "1rem",
                    padding: "1rem 2rem",
                    width: "60%",
                  }}
                  title="Modelo artigo SBC"
                  href={
                    "https://www.sbc.org.br/documentos-da-sbc/summary/169-templates-para-artigos-e-capitulos-de-livros/878-modelosparapublicaodeartigos"
                  }
                  download={false}
                  target="_blank"
                />
                {/* <ButtonDefault
                    style={{marginBottom: "1rem", padding: "1rem 2rem", width: "60%" }}
                    title="Modelo artigo resumido SBC"
                    href={
                      "https://www.sbc.org.br/documentos-da-sbc/summary/169-templates-para-artigos-e-capitulos-de-livros/878-modelosparapublicaodeartigos"
                    }
                    download={false}
                    target="_blank"
                  /> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
