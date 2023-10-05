import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import DrawerComponent from "../drawer/Drawer";
import { logout } from "../../utils/Auth";

type Props = {
    title: string;
    typeUser: "User" | "Organização";
}


export function Navbar( { title, typeUser }:Props ) {
  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <DrawerComponent title={title} typeUser={typeUser} />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              color="inherit"
            >
              {title}
            </Typography>
            <Button color="inherit" onClick={() => {logout()}}>{"Logout"}</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
