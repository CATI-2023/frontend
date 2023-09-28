import { Box } from "@mui/material";

type Props = {
  nome: string;
  atuacao: string;
  tema: string;
  lattes?: string;
  foto: string;
};

export function Palestrante({ nome, atuacao, tema, lattes, foto }: Props) {
  return (
    <>
      <Box display={"flex"} alignItems={"center"} flexDirection={"column"} mt={"4em"}>
        {/* <Avatar sx={{ height: "8em", width: "8em" }} /> */}
        <img src={foto} style={{ height: "8em", width: "8em" }}></img>
        <p className="name-palestrante-third-section"> {nome} <br></br> {tema}</p>
        <p className="text-palestrante-third-section">
          {atuacao}
        </p>
        <p className="text-palestrante-third-section">
          <a href={lattes}>Currículum Lattes</a>
        </p>
      </Box>
    </>
  );
}
