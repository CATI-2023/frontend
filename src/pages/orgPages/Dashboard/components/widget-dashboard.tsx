import { Card, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IconProps } from "@phosphor-icons/react";

interface props {
  title: string;
  Icon: React.ComponentType<IconProps>;
  route?: string;
}

export default function WidgetDashboard({ title, Icon, route = "" }: props) {
  const navigate = useNavigate();
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 3,
        borderRadius: 2,
      }}
      onClick={() => {
        navigate(route);
      }}
      alignItems={"center"}
      alignContent={"center"}
    >
      <Icon size={30} />

      <Stack spacing={0.5}>
        <Typography sx={{ fontFamily: "Roboto", fontSize: "1.5rem" }}>
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}
