import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { apoiadores, patrocinadores } from "../../../../Types/type";
import { DefaultsIcons } from "../../../../constants/DefaultIcons";
import { DialogActionsPatrocinadores } from "./DialogAction";
import { useState } from "react";
import { deleteApoiadores } from "../../../../services/apoiadores";
import useNotification from "../../../../hooks/useNotification";
interface props {
  apoiadores: apoiadores | null;
}
export function ListaApoiadores({ apoiadores }: props) {
  const [open, setOpen] = useState(false);
  const [selectedApoiador, setSelectedApoiador] =
    useState<patrocinadores | null>(null);
  const showNotification = useNotification();
  const handleOpen = (patrocinador: patrocinadores | null) => {
    setSelectedApoiador(patrocinador);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedApoiador({
      razao_social: "",
      telefone: "",
      nivel: "BRONZE",
      email: "",
      banner_base64: "",
    });
    setOpen(false);
  };

  const handleDeletePatrocinador = async (
    id_patrocinador: number | undefined
  ) => {
    if (id_patrocinador != undefined) {
      await deleteApoiadores(id_patrocinador)
        .then((res) => {
          showNotification({
            message: "Apoiador removido com sucessor" + res,
            type: "success",
            title: "Apoiador removido",
          });
        })
        .catch((err) => {
            showNotification({
                message: "Erro ao remover o apoiador" + err,
                type: "error",
                title: "Apoiador não removido",
            });
        });
        window.location.reload();
    }
  };
  return (
    <>
      <Box
        my={4}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"end"}
        gap={2}
      >
        <Button
          variant="contained"
          sx={{ display: "flex", gap: 2 }}
          onClick={() => {
            setSelectedApoiador(null);
            handleOpen(null);
          }}
        >
          <DefaultsIcons.AdiconarIcon size={26} />
          Adiconar colaborador
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Razão Social</TableCell>
                <TableCell align="center">Telefone</TableCell>
                <TableCell align="center">Banner</TableCell>
                <TableCell align="center">Nivel</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apoiadores != null
                ? apoiadores.patrocinadores.map(
                    (patrocinador: patrocinadores) => (
                      <TableRow key={patrocinador.patrocinador_id}>
                        <TableCell align="center">
                          {patrocinador.razao_social}
                        </TableCell>
                        <TableCell align="center">
                          {patrocinador.telefone}
                        </TableCell>
                        <TableCell align="center">
                          <img
                            height={"100px"}
                            width={"100px"}
                            src={patrocinador.banner_base64}
                            alt=""
                          />
                        </TableCell>
                        <TableCell align="center">
                          {patrocinador.nivel}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="inherit"
                            onClick={() => {
                              handleOpen(patrocinador);
                            }}
                          >
                            <DefaultsIcons.EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => {
                              handleDeletePatrocinador(
                                patrocinador?.patrocinador_id
                              );
                            }}
                          >
                            <DefaultsIcons.ApagarIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  )
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <DialogActionsPatrocinadores
        Data={selectedApoiador}
        open={open}
        onClose={handleClose}
        title="colaborador"
      />
    </>
  );
}
