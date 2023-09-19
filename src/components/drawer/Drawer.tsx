import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { Box, IconButton, Typography } from "@mui/material";
import { ListItemDrawer } from "./ListItemDrawer";
import { DefaultsIcons } from "../../constants/DefaultIcons";

interface props {
  title: string;
}

export default function DrawerComponent({ title }: props) {
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
                route="/dashboard"
              />
              <ListItemDrawer
                title="Mini Cursos"
                Icon={DefaultsIcons.MiniCursorIcon}
                size={24}
                route="/mini-cursos"
              />
              <ListItemDrawer
                title="Palestras"
                Icon={DefaultsIcons.PalestranteIcon}
                size={24}
                route="/palestras"
              />
              <ListItemDrawer
                title="Presença"
                Icon={DefaultsIcons.PresencaIcon}
                size={24}
                route="/presenca"
              />
            </List>
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
