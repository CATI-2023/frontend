import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";

type Props = {
  nome: string;
  atuacao: string;
  tema: string;
  lattes?: string;
  linkedin?: string;
  foto?: string;
};

export function PalestranteCard({
  nome,
  atuacao,
  tema,
  lattes,
  foto,
  linkedin,
}: Props) {
  return (
    <Card
      sx={{
        width: { xs: "90%", sm: "80%" },
        minHeight: "90%",
        marginTop: "2em",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <CardHeader
        sx={{ fontFamily: "Roboto, sans-serif" }}
        avatar={
          <Avatar alt={nome} src={foto} sx={{ height: "8em", width: "8em" }} />
        }
        title={<p className="name-palestrante-third-section">{nome}</p>}
        subheader={<p style={{ fontFamily: "Roboto" }}>{atuacao}</p>}
      />
      <CardContent sx={{ padding: "0 1em" }}>
        <p className="name-palestrante-third-section">{tema}</p>
      </CardContent>
      <CardActions>
        {lattes != "" ? (
          <Button size="small" href={lattes}>
            Currículo Lattes
          </Button>
        ) : (
          ""
        )}
        {linkedin != "" ? (
          <Button size="small" href={linkedin}>
            LinkedIn
          </Button>
        ) : (
          ""
        )}
      </CardActions>
    </Card>
  );
}
