import { Avatar, Box, SxProps } from "@mui/material";

interface IColaborador {
  logo?: string;
}

// export function ColaboradorCard({ logo }: IColaborador) {
//   return (
//     <>
//       <Box
//         width="270px"
//         height={"110px"}
//         border={" 1px solid #c2c2c2"}
//         display={"flex"}
//         alignItems={"center"}
//         justifyContent={"center"}
//       >
//         <img src={logo} alt="" width={"120px"} height={"60px"}/>
//       </Box>
//     </>
//   );
// }

export function ColaboradorCard({ }: IColaborador) {
  return (
    <>
      <Box
        width="270px"
        height={"110px"}
        border={" 1px solid #c2c2c2"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Avatar />
      </Box>
    </>
  );
}