<<<<<<< HEAD
import { Avatar, Box } from "@mui/material";
import "../style.css"
export function Palestrante() {
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        mt={"4em"}
        width={"100%"}
      >
        <Avatar sx={{ height: "8em", width: "8em" }} />
        <p className="name-palestrante-third-section"> Palestrante</p>
        <Box px={{xs: "1.5rem", sm: "1.5rem", md: "1.5rem", lg: "3rem", xl: "3rem"}}>
          <p className="text-palestrante-third-section">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </Box>
=======
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
>>>>>>> fix_input_palestrantes_dados
      </Box>
    </>
  );
}
