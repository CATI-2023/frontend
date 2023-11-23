import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { DefaultsIcons } from "../constants/DefaultIcons";
import { LogoCatiIndex } from "../assets/logoCatiIndex";

const pages = [
  { label: "CATI", element: "secondSection" },
  { label: "Palestrantes", element: "thirdSection" },
  { label: "Artigos", element: "artigosSection" },
  { label: "Jogos", element: "jogosSection" },
  { label: "Colaboradores", element: "fourthSection" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClick = (idElement: string) => {
    const element = document.getElementById(idElement);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#00214e" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoCatiIndex
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, width: "8em" }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => handleClick(page.element)}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LogoCatiIndex
            sx={{ display: { xs: "flex", md: "none" }, mr: 1, width: "6em" }}
          />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => handleClick(page.element)}
                sx={{ color: "white", display: "block", textAlign: "center" }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton href="www.instagram.com/caccunemat" sx={{ p: 0 }}>
              <DefaultsIcons.InstagramIcon size={40} color="white" />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
