import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  AssignmentTurnedIn,
  Home,
  Sell,
  Spellcheck,
} from "@mui/icons-material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

interface Props {
  open: boolean;
}

class MenuOption {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;

  constructor({
    name,
    icon,
    onClick,
  }: {
    name: string;
    icon: React.ReactNode;
    onClick: () => void;
  }) {
    this.name = name;
    this.icon = icon;
    this.onClick = onClick;
  }
}

const MiniDrawer: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isHovered, setIsHovered] = useState(false);

  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  React.useEffect(() => {
    switch (location.pathname) {
      case "/dictionary":
        setSelectedIndex(0);
        break;
      case "/check-grammar":
        setSelectedIndex(1);
        break;
      case "/check-spelling":
        setSelectedIndex(2);
        break;
      case "/flash-card":
        setSelectedIndex(2);
        break;
      default:
        setSelectedIndex(-1);
        break;
    }
  }, [location]);

  const { t } = useTranslation("global");

  const menuOptions: MenuOption[] = [
    new MenuOption({
      name: t("dictionary"),
      icon: <Home />,
      onClick: () => {
        navigate("/");
      },
    }),
    new MenuOption({
      name: t("checkGrammar"),
      icon: <AssignmentTurnedIn />,
      onClick: () => {},
    }),
    new MenuOption({
      name: t("checkSpelling"),
      icon: <Spellcheck />,
      onClick: () => {},
    }),
    new MenuOption({
      name: t("flashCard"),
      icon: <Sell />,
      onClick: () => {},
    }),
  ];

  function MenuOptionItem({
    item,
    index,
  }: {
    item: MenuOption;
    index: number;
  }) {
    return (
      <ListItem
        disablePadding
        sx={{
          display: "block",
          backgroundColor:
            index === selectedIndex ? "secondary.light" : "transparent",
          color: "default",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent:
              props.open || (!props.open && isHovered) ? "initial" : "center",
            px: 2.5,
            whiteSpace: "nowrap",
          }}
          onClick={() => {
            setSelectedIndex(index);
            item.onClick();
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: props.open || (!props.open && isHovered) ? 3 : "auto",
              justifyContent: "center",
              color: "default",
            }}
          >
            {item.icon}
          </ListItemIcon>
          {(props.open || (!props.open && isHovered)) && (
            <ListItemText primary={item.name} />
          )}
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: 1,
        borderColor: (theme) => theme.palette.divider,
        overflowX: "hidden",
        width:
          props.open || (!props.open && isHovered)
            ? `${drawerWidth}px`
            : "72px",
        transition: "width 0.2s, padding 0.3s",
        marginTop: "64px",
      }}
    >
      <CssBaseline />
      <div>
        <List>
          {menuOptions.map((item, index) => (
            <MenuOptionItem item={item} index={index} key={item.name} />
          ))}
        </List>
      </div>
    </Box>
  );
};

export default MiniDrawer;
