import React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import { iconColor, itemsList } from "./item-list";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";

export const DrawerComponent = ({ dispatch, open, handleDrawerClose }) => {
  // const { rol } = useSelector((state) => state.auth);
  const location = useLocation();
  const history = useHistory();
  //   const [openList, setOpenList] = useState(false);

  const goToPage = (e, path) => {
    e.preventDefault();
    if (path === "/login") {
      history.replace(path);
    }
    history.push(path);
  };

  return (
    <React.Fragment>
      <List dense={true}>
        {itemsList.map((item, index) => {
          return (
            <ListItem
              sx={{
                bgcolor: location.pathname === item.path && "#b9e0e1",
              }}
              key={index}
              button
              onClick={(e) => {
                goToPage(e, item.path);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List dense={true}>
        <ListItem
          button
          onClick={(e) => {
            localStorage.clear();
            goToPage(e, "/auth/login");
          }}
        >
          <ListItemIcon>
            <LogoutIcon color={iconColor} />
          </ListItemIcon>
          <ListItemText primary="Salir" />
        </ListItem>
      </List>
    </React.Fragment>
  );
};
