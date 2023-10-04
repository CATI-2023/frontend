import { Box, Grid } from "@mui/material";
import "./style.css";
import CSGo from "../../../../assets/arte_cs_go.png";
import Fifa23 from "../../../../assets/arte_fifa_23.png";
import { ButtonDefault } from "../../../../components/buttonDefault/btnInscrevaSe";

export function JogosSection() {
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={3}
        height={"100vh"}
        className="background-jogos-section"
      >
        <p className="primary-text-section">Jogos</p>
        <Grid container>
          <Grid
            item
            xs={12}
            marginBottom={{ md: "2rem", xs: "1rem" }}
            display={{ xs: "flex", md: "none" }}
            maxHeight={"30vh"}
            justifyContent={"space-around"}
          >
            <Box textAlign={"center"}>
              <img src={CSGo} loading="lazy" height={"100%"} />
            </Box>
            <Box textAlign={"center"}>
              <img src={Fifa23} loading="lazy" height={"100%"} />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            marginBottom={{ md: "2rem", xs: "1rem" }}
            display={{ xs: "none", md: "flex" }}
            maxHeight={"80vh"}
            justifyContent={"center"}
          >
            <Box textAlign={"center"}>
              <img src={CSGo} loading="lazy" height={"100%"} />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            alignItems={"center"}
            marginBottom={{ md: "2rem", xs: "1rem" }}
            textAlign={"center"}
            display={"flex"}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
              flexDirection={"column"}
            >
              <p className="second-text-jogos-section">
                Estão abertas as inscrições para o campeonato de jogos 2023.
              </p>
              {/* <br></br>
              <p
                style={{
                  borderRadius: "50px",
                  background: "white",
                  color: "#00214e",
                  padding: "1rem 2rem",
                  width: "60%",
                  fontSize: "1.5rem",
                }}
              >
                Inscrições: R$10,00
              </p> */}
              <ButtonDefault
                style={{
                  margin: "2rem 0",
                  padding: "1rem 2rem",
                  width: "80%",
                  fontSize: "2rem",
                }}
                title="Inscreva-se"
                href="https://forms.gle/5tLfV72vc5hCjXPE7"
              />
              <br></br>
              <p className="second-text-jogos-section">
                Se você não tem time, não se preocupe,{" "}
                <a
                  href="https://drive.google.com/drive/folders/1JvsE-VRsqxm0VNZAdiorSsitxNn_PZEb"
                  className="second-text-jogos-section-link"
                >
                  {" "}
                  leia o regulamento
                </a>
                .
              </p>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            marginBottom={{ md: "2rem", xs: "1rem" }}
            display={{ xs: "none", md: "flex" }}
            maxHeight={"80vh"}
            justifyContent={"center"}
          >
            <Box textAlign={"center"}>
              <img src={Fifa23} loading="lazy" height={"100%"} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
