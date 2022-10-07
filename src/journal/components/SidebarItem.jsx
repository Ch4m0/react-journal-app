import { TitleOutlined, TurnedInNot } from "@mui/icons-material";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  ListItemButton,
} from "@mui/material";
import { useMemo } from "react";
import { setActiveNote } from "../../store/journal/journalSlice";
import { useDispatch } from "react-redux";

export const SidebarItem = ({ title, body, id, date, imageUrls = [] }) => {
  const dispatch = useDispatch();

  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  const onClickNote = () => {
    console.log({ title, body, id, date, imageUrls }, "NOTA");
    dispatch(setActiveNote({ title, body, id, date, imageUrls }));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
