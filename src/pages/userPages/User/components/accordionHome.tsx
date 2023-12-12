import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { InscricoesEventosCards } from "./inscricoesEventosCards";
import { ListaPresencas } from "./listPresencas";
import { ListaEquipes } from "./equipes/listCompeticoesEquipes";
import { ParticipanteAuth } from "../../../../Types/type";

interface InformacoesParticipanteProps {
  participante: ParticipanteAuth;
}

export function ControlledAccordions({
  participante,
}: InformacoesParticipanteProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      event.preventDefault();
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        sx={{ mt: "1rem" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography
            sx={{ width: "33%", flexShrink: 0 }}
            fontSize={"1.3em"}
            fontWeight={"bold"}
          >
            Inscrições
          </Typography>
          <Typography sx={{ color: "text.secondary" }} paddingLeft={"1rem"}>
            Minhas inscrições de eventos
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <InscricoesEventosCards participante={participante} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography
            sx={{ width: "33%", flexShrink: 0 }}
            fontSize={"1.3em"}
            fontWeight={"bold"}
          >
            Frequência
          </Typography>
          <Typography sx={{ color: "text.secondary" }} paddingLeft={"1rem"}>
            Minha lista de frequência em eventos
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListaPresencas participante={participante} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography
            sx={{ width: "33%", flexShrink: 0 }}
            fontSize={"1.3em"}
            fontWeight={"bold"}
          >
            Equipes de Competição
          </Typography>
          <Typography sx={{ color: "text.secondary" }} paddingLeft={"1rem"}>
            Minha lista de equipes em competições
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListaEquipes participante={participante} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
