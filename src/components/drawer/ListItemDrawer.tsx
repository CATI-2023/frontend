import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { IconProps } from "@phosphor-icons/react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface props {
  title: string;
  Icon: React.ComponentType<IconProps>;
  size: number;
  route?: string;
}

export function ListItemDrawer({ title, Icon, size, route = "" }: props) {
  const navigate = useNavigate();
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            navigate(route);
          }}
        >
          <ListItemIcon>
            <Icon size={size} />
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      </ListItem>
    </>
  );
}
