import { Card, Container, Grid, Stack, Typography } from "@mui/material";
import { Navbar } from "../../../components/navbar/Navbar";
import WidgetDashboard from "./components/widget-dashboard";
import { DefaultsIcons } from "../../../constants/DefaultIcons";

export function OrganizacaoPage() {
  return (
    <>
      <Navbar title="Dashboard" typeUser="Organização" />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Card
          component={Stack}
          direction="row"
          sx={{
            px: 2,
            py: 2,
            borderRadius: 2,
            mt: 4,
            mb: 4,
            backgroundColor: "#1976d27a",
            color: "#fff",
          }}
          alignItems={"center"}
          alignContent={"center"}
          justifyContent={"center"}
          justifyItems={"center"}
        >
          <Typography sx={{ fontSize: "1.5rem", textAlign: "center" }}>
            Cadastros gerais
          </Typography>
        </Card>
        <Grid
          container
          alignItems={"center"}
          alignContent={"center"}
          justifyContent={"center"}
          justifyItems={"center"}
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <WidgetDashboard
              title="Eventos"
              Icon={DefaultsIcons.EventosIcon}
              route="/eventos/org/"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <WidgetDashboard
              title="Participantes"
              Icon={DefaultsIcons.ParticipantesIcon}
              route="/participantes/org/"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <WidgetDashboard
              title="Palestras"
              Icon={DefaultsIcons.PalestranteIcon}
              route="/palestras/org/"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <WidgetDashboard
              title="Minicursos"
              Icon={DefaultsIcons.MiniCursorIcon}
              route="/mini-cursos/org/"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <WidgetDashboard
              title="Notícias"
              Icon={DefaultsIcons.NoticiasIcon}
              route=""
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <WidgetDashboard
              title="Colaboradores"
              Icon={DefaultsIcons.ApoiadoresIcon}
              route="/apoiadores/org/"
            />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Card
          component={Stack}
          direction="row"
          sx={{
            px: 2,
            py: 2,
            borderRadius: 2,
            mt: 4,
            mb: 4,
            backgroundColor: "#1976d27a",
            color: "#fff",
          }}
          alignItems={"center"}
          alignContent={"center"}
          justifyContent={"center"}
          justifyItems={"center"}
        >
          <Typography sx={{ fontSize: "1.5rem", textAlign: "center" }}>
            Inscrições e registro de presença
          </Typography>
        </Card>
        <Grid
          container
          alignItems={"center"}
          alignContent={"center"}
          justifyContent={"center"}
          justifyItems={"center"}
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <WidgetDashboard
              title="Inscrições Eventos"
              Icon={DefaultsIcons.InscricaoEventoIcon}
              route="/inscricao-evento/org/"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <WidgetDashboard
              title="Inscrições Minicursos"
              Icon={DefaultsIcons.InscricaoEventoIcon}
              route=""
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <WidgetDashboard
              title="Registro de Frequência"
              Icon={DefaultsIcons.PresencaIcon}
              route="/presenca/org/"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
