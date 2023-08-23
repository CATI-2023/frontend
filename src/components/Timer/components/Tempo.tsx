import { Box } from "@mui/material";
import "../style.css"
interface Itempo {
    titulo: string,
    tempo: string,
}
export function Tempo({ titulo,tempo }: Itempo) {
    return (
        <>
        <Box display={"flex"} flexDirection={"column"} textAlign={"center"}>
        <p className="timer-tempo-dia-afins">{tempo}</p>
        <p className="timer-tempo-titulo">{titulo}</p>
        </Box>
        </>
    );
}