import { Box, Container } from "@mui/material";
import { Navbar } from "../../components/navbar/Navbar";
import { DisplayUser } from "./components/DisplayUser";

export function UserPage() {
  return (
    <>
      <Container maxWidth={"xl"}>
        <Box display="flex" flexDirection="column" height={"100vh"}>
          <Navbar title="Dashboard" />
          <Box
            height={"100%"}
            py={2}
            // p={2}
            display={"flex"}
            flexDirection={"column"}
            gap={2}
          >
            <Box
              height={"48%"}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
              flexDirection={{ xs: "column", sm: "column", md: "row" }}
            >
              <DisplayUser />
              <DisplayUser />
            </Box>
            <Box
              height={"48%"}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
              flexDirection={{ xs: "column", sm: "column", md: "row" }}
            >
              <DisplayUser />
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
