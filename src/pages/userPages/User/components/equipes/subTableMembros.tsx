import { ReactNode, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DefaultsIcons } from "../../../../../constants/DefaultIcons";
import {
  ParticipanteAuth,
  equipe,
  membroEquipe,
} from "../../../../../Types/type";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { DialogActionMembroEquipe } from "./DialogActionMembroEquipe";
import { deleteMembroEquipe } from "../../../../../services/membrosEquipe";
import useNotification from "../../../../../hooks/useNotification";

interface Props {
  children?: ReactNode;
  equipe: equipe;
  participante: ParticipanteAuth;
}

const ExpandableTableRow = ({
  children,
  equipe,
  participante,
  ...otherProps
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedEquipe, setSelectedEquipe] = useState<equipe | null>(null);

  const [openDialogMembro, setOpenDialogMembro] = useState(false);
  const [membroLider, setMembroLider] = useState(false);
  const showNotification = useNotification();

  const handleCloseDialogMembro = () => {
    setOpenDialogMembro(false);
  };

  async function deleteMembro(membro_equipe_id: number) {
    deleteMembroEquipe(membro_equipe_id)
      .then(() => {
        showNotification({
          type: "success",
          title: "Sucesso ao remover Membro na Equipe.",
          message: "Membro removido com sucesso.",
        });
        handleCloseDialogMembro();
        window.location.reload();
      })
      .catch((err) => {
        showNotification({
          type: "error",
          title: "Erro ao remover Membro na Equipe.",
          message: "Membro não removido. " + err?.response?.data?.message,
        });
      });
  }

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox" align="center">
          <IconButton
            onClick={() => {
              setSelectedEquipe(equipe);
              setIsExpanded(!isExpanded);
              setMembroLider(
                equipe.MembroEquipe?.find(
                  (m) =>
                    m.participante_id_reference == participante.participante_id
                )?.lider || false
              );
            }}
          >
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={6}>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Button
                  variant={"outlined"}
                  disabled={!membroLider}
                  sx={{ display: "flex", gap: 2 }}
                  onClick={() => {
                    setOpenDialogMembro(true);
                  }}
                >
                  <DefaultsIcons.AdicionarIcon size={26} /> Adicionar Membro
                </Button>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <b>Membro</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Líder</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Remover</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {equipe.MembroEquipe && equipe.MembroEquipe.length > 0
                        ? equipe.MembroEquipe.map((membro: membroEquipe) => (
                            <TableRow key={membro.membro_equipe_id}>
                              <TableCell align="center">
                                {membro.participante?.nome}
                              </TableCell>
                              <TableCell align="center">
                                <Chip
                                  label={membro.lider ? "Líder" : "Membro"}
                                  color={membro.lider ? "success" : "default"}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <IconButton
                                  color="error"
                                  disabled={membro.lider || !membroLider}
                                  onClick={() => {
                                    deleteMembro(membro.membro_equipe_id || 0);
                                  }}
                                >
                                  <DefaultsIcons.ApagarIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                        : "Nenhum membro encontrado."}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
      <DialogActionMembroEquipe
        open={openDialogMembro}
        onClose={handleCloseDialogMembro}
        Data={selectedEquipe}
      />
    </>
  );
};

export { ExpandableTableRow };
