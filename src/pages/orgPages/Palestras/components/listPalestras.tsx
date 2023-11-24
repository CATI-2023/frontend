import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DefaultsIcons } from "../../../../constants/DefaultIcons";
import { palestra } from "../../../../Types/type";
import { DialogActionPalestras } from "./DialogActionPalestras";
import { getPalestras, deletePalestra } from "../../../../services/palestras";
import useNotification from "../../../../hooks/useNotification";

export function ListPalestras() {
  const [palestraList, setPalestraList] = useState<palestra[] | null>(null);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [busca, setBusca] = useState<string>("*");

  const [open, setOpen] = useState(false);
  const [selectedPalestra, setSelectedPalestra] = useState<palestra | null>(
    null
  );
  async function getPalestraList() {
    getPalestras(page, busca)
      .then((res) => {
        if (res.data.palestras.total > 0) {
          setTotalPages(Math.ceil(res.data.palestras.total / 10));
          setTotalRows(res.data.palestras.total);
        } else {
          setTotalRows(0);
          setTotalPages(0);
        }
        setPalestraList(res.data.palestras.palestras);
      })
      .catch((err) =>
        showNotification({
          message:
            err?.response?.data?.message ?? "Erro ao carregar Palestras.",
          type: "error",
        })
      );
  }

  useEffect(() => {
    getPalestraList();
  }, [page, busca]);

  const handleOpen = (data: palestra | null) => {
    setOpen(true);
    setSelectedPalestra(data);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPalestra({
      atuacao_palestrante: "",
      lattes_palestrante: "",
      palestra_id: 0,
      tema: "",
      descricao: "",
      data: "",
      evento_id_reference: 0,
      participante_id_reference: 0,
    });
  };

  const showNotification = useNotification();

  const handleDeletePalestra = async (id_palestra: number | undefined) => {
    await deletePalestra(id_palestra)
      .then((res) => {
        showNotification({
          type: "success",
          title: "Sucesso ao remover o Palestra" + res,
          message: "Palestra removido com sucesso",
        });
        handleClose();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        showNotification({
          type: "error",
          title: "Erro ao remover o Palestra",
          message: "Palestra não removido" + err?.response?.data?.message,
        });
      });
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
          variant={"contained"}
          sx={{ display: "flex", gap: 2 }}
          onClick={() => {
            handleOpen(null);
          }}
        >
          <DefaultsIcons.AdicionarIcon size={26} /> Adicionar Palestra
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  <TextField
                    label="Informe sua busca"
                    fullWidth
                    onChange={(e) => {
                      setBusca(
                        e.target.value.length > 2 ? e.target.value : "*"
                      );
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <b>Tema</b>
                </TableCell>
                <TableCell align="center">
                  <b>Data</b>
                </TableCell>
                <TableCell align="center">
                  <b>Palestrante</b>
                </TableCell>
                <TableCell align="center">
                  <b>Evento</b>
                </TableCell>
                <TableCell align="center">
                  <b>Ações</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {palestraList != null
                ? palestraList.map((palestraItem: palestra) => (
                    <TableRow key={palestraItem.palestra_id}>
                      <TableCell align="center">{palestraItem.tema}</TableCell>
                      <TableCell align="center">
                        {new Date(palestraItem.data).toLocaleDateString(
                          "pt-BR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {palestraItem.palestrante?.nome}
                      </TableCell>
                      <TableCell align="center">
                        {palestraItem.evento?.ano +
                          " - " +
                          palestraItem.evento?.tema}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                            handleOpen(palestraItem);
                          }}
                        >
                          <DefaultsIcons.EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            handleDeletePalestra(palestraItem?.palestra_id);
                          }}
                        >
                          <DefaultsIcons.ApagarIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                : "Carregando..."}
            </TableBody>
          </Table>
          <Typography margin={"1rem 0 0 1rem"}>
            {"Total de registros: "}
            {totalRows}
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => {
              e.preventDefault();
              setPage(value);
            }}
          />
        </TableContainer>
      </Box>
      <DialogActionPalestras
        open={open}
        onClose={handleClose}
        Data={selectedPalestra}
      />
    </>
  );
}
