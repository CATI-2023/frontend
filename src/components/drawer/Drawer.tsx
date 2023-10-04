import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { Box, IconButton, Typography } from "@mui/material";
import { ListItemDrawer } from "./ListItemDrawer";
import { DefaultsIcons } from "../../constants/DefaultIcons";

interface props {
  title: string;
  typeUser: "User" | "Organização";
}

export default function DrawerComponent({ title, typeUser }: props) {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: "left", open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <Box width={"auto"}>
      <React.Fragment key={"left"}>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer("left", true)}
        >
          <DefaultsIcons.MenuIcon color="white" />
        </IconButton>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          <Box p={2}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"start"}
              gap={4}
            >
              <IconButton onClick={toggleDrawer("left", false)}>
                <DefaultsIcons.BackIcon />
              </IconButton>
              <Typography textAlign={"center"}>{title}</Typography>
            </Box>
            <List>
              <ListItemDrawer
                title="Dashboard"
                Icon={DefaultsIcons.DashboarIcon}
                size={24}
                route={
                  typeUser === "User"
                    ? "/dashboard/user/123"
                    : "/dashboard/org/123"
                }
              />
              <ListItemDrawer
                title="Mini Cursos"
                Icon={DefaultsIcons.MiniCursorIcon}
                size={24}
                route={
                  typeUser === "User"
                    ? "/mini-cursos/user/123"
                    : "/mini-cursos/org/123"
                }
              />
              {typeUser === "Organização" ? (
                <ListItemDrawer
                  title="Palestras"
                  Icon={DefaultsIcons.PalestranteIcon}
                  size={24}
                  route="/palestras/org/123"
                />
              ) : null}
              <ListItemDrawer
                title="Presença"
                Icon={DefaultsIcons.PresencaIcon}
                size={24}
                route={
                  typeUser === "User"
                    ? "/presenca/user/123"
                    : "/presenca/org/123"
                }
              />
            </List>
            {typeUser === "Organização" ? (
              <ListItemDrawer
                title="Apoiadores"
                Icon={DefaultsIcons.ApoiadoresIcon}
                size={24}
                route="/apoiadores/org/123"
              />
            ) : null}
            {typeUser === "Organização" ? (
              <ListItemDrawer
                title="Participantes"
                Icon={DefaultsIcons.ParticipantesIcon}
                size={24}
                route="/participantes/org/123"
              />
            ) : null}
            {typeUser === "Organização" ? (
              <ListItemDrawer
                title="Noticias"
                Icon={DefaultsIcons.NoticiasIcon}
                size={24}
                route="/noticias/org/123"
              />
            ) : null}

            <Divider />
            <List>
              {/* <ListItemDrawer
                title="Dashboard"
                Icon={DefaultsIcons.DashboarIcon}
                size={24}
              /> */}
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </Box>
  );
}
