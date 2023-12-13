import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import DrawerComponent from "../drawer/Drawer";
import { logout } from "../../utils/Auth";
import { DefaultsIcons } from "../../constants/DefaultIcons";
import "./style.css";

type Props = {
  title: string;
  typeUser: "User" | "Organização";
};

export function Navbar({ title, typeUser }: Props) {
  
  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            {typeUser == "User" ? null : (
              <DrawerComponent title={title} typeUser={typeUser} />
            )}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              color="inherit"
            >
              {title}
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => {
                logout();
              }}
            >
              <DefaultsIcons.LogOff /> Sair
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
