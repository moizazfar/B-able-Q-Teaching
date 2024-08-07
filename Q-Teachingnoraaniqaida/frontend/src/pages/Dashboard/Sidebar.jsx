import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Home as HomeIcon,
  BarChart as BarChartIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const history = useNavigate();

  const menuItems = [
    { text: "Dashboard", icon: <HomeIcon />, path: "/" },
    {
      text: "Student Progress",
      icon: <BarChartIcon />,
      path: "/student-progress",
    },
  ];

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
          Student Dashboard
        </Typography>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} onClick={() => history(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
