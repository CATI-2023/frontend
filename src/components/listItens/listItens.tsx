import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { LabelImportant } from "@mui/icons-material";
import "./style.css";
type Props = {
  itens: string[];
};
export function ListItens({ itens }: Props) {
  return (
    <>
      <List
        sx={{
          marginTop: "2rem",
          padding: { lg: "0 4rem 0 6rem", xs: "0 1rem 0 2rem" },
          textAlign: "left",
        }}
      >
        {itens.map((i) => (
          <ListItem sx={{ padding: "0" }}>
            <ListItemIcon sx={{ minWidth: "2rem" }}>
              <LabelImportant sx={{ color: "white" }} />
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
