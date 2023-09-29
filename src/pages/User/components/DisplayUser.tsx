import { Box } from "@mui/material";

export function DisplayUser() {
  return (
    <>
      <Box
        height={"100%"}
        width={"100%"}
        bgcolor={"white"}
        borderRadius={2}
        color={"black"}
        display={"flex"}
        flexDirection={'column'}
        alignItems={"center"}
        py={2}
        justifyContent={"start"}
        // boxShadow={"5px 5px 10px grey"}
      >
        <h1>Palestra</h1>
      </Box>
    </>
  );
}
