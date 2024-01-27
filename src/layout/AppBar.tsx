import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link, useNavigate } from "react-router-dom";
//import { AuthContext } from "../../context/AuthContext";
import Avatar from "@mui/material/Avatar";
import { useTranslation } from "react-i18next";
import LanguageMenu from "./LanguageMenu";
import { useDispatch, useSelector } from "react-redux";
import { sGetUserInfo } from "../store/user/selector";
import { AppDispatch } from "../store";
import { getUserProfile } from "../store/user/thunkApi";

interface Props {
  toggleSidebar: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const PrimaryAppbar: React.FC<Props> = (props: Props) => {
  const ChangeToggleSidebar = () => {
    props.toggleSidebar();
  };

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  React.useEffect(() => {
    setAnchorEl(null);
  }, [props.isLoggedIn]);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const user = useSelector(sGetUserInfo);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const { t } = useTranslation("global");

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ marginTop: "35px" }}
    >
      {user != null && (
        <MenuItem>
          {t("welcome")} {user?.name}
        </MenuItem>
      )}
      <MenuItem
        onClick={() => {
          setAnchorEl(null);
          navigate("/profile");
        }}
      >
        {t("profile")}
      </MenuItem>
      <MenuItem
        onClick={() => {
          props.onLogout();
          setAnchorEl(null);
        }}
      >
        {t("logout")}
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {props.isLoggedIn && (
        <>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={ChangeToggleSidebar}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
                onClick={() => {
                  navigate("/");
                }}
              >
                {t("englishHubUppercase")}
              </Typography>

              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                  },
                }}
              >
                <LanguageMenu />
                {user != null ? (
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <Avatar
                      // alt={`${user?.firstname} ${user?.lastname}`}
                      //src={user?.avatar}
                      style={{
                        border: "2px solid white",
                      }}
                    />
                  </IconButton>
                ) : (
                  <>
                    <Link
                      to={"/login"}
                      style={{
                        textDecoration: "none",
                        color: "white",
                      }}
                    >
                      {t("logIn")}
                    </Link>
                    <Link
                      to={"/register"}
                      style={{
                        textDecoration: "none",
                        color: "white",
                      }}
                    >
                      {t("register")}
                    </Link>
                  </>
                )}
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          {renderMenu}
        </>
      )}

      {!props.isLoggedIn && (
        <>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
                onClick={() => {
                  navigate("/landing");
                }}
              >
                CLASS ROOM
              </Typography>

              <Box sx={{ flexGrow: 1 }} />

              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginRight: "16px",
                }}
              >
                REGISTER
              </Link>

              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginRight: "2px",
                }}
              >
                LOGIN
              </Link>
            </Toolbar>
          </AppBar>
        </>
      )}
    </Box>
  );
};

export default PrimaryAppbar;
