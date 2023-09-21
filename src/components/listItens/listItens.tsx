import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { LabelImportant } from "@mui/icons-material";
import "./style.css";
type Props = {
  itens: string[];
  iconColor?: string;
};
export function ListItens({ itens, iconColor}: Props) {
  return (
    <>
      <List
        sx={{
          paddingLeft: { lg: "6rem", xs: "2rem" },
          textAlign: "left",
        }}
      >
        {itens.map((i) => (
          <ListItem sx={{ padding: "0" }}>
            <ListItemIcon sx={{ minWidth: "2rem" }}>
              <LabelImportant sx={{ color: iconColor}} />
            </ListItemIcon>
            <ListItemText>
              <p className="item-list-index">{i}</p>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}
