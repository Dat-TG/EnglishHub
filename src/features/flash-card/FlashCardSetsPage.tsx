import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { IFlashCardList } from "../../types/flashcard";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getAllFlashCardList } from "../../config/api/user/apiUser";
import { deleteFlashCardList } from "../../config/api/flashcard/apiFlashcard";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { sGetUserInfo } from "../../store/user/selector";

export default function FlashCardSetsPage() {
  const navigate = useNavigate();

  const [flashCardSets, setFlashCardSets] = useState<IFlashCardList[]>([]);
  useEffect(() => {
    getAllFlashCardList().then((res) => {
      setFlashCardSets(res);
    });
  }, []);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    listId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedListId(listId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const { t } = useTranslation("global");

  const handleDeleteList = () => {
    if (selectedListId) {
      deleteFlashCardList(selectedListId).then((res) => {
        if (res.status === 201 || res.status === 200) {
          const updatedFlashCardSets = flashCardSets.filter(
            (set) => set._id !== selectedListId
          );
          setFlashCardSets(updatedFlashCardSets);
          handleMenuClose();
        }
      });
    }
  };

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
      <MenuItem
        onClick={() => {
          navigate(`/edit-set/${selectedListId}`);
        }}
      >
        {t("edit")}
      </MenuItem>
      <MenuItem onClick={handleDeleteList}>{t("delete")}</MenuItem>
    </Menu>
  );

  const user = useSelector(sGetUserInfo);

  return user == null ? (
    <Box
      sx={{ m: 1 }}
      p={{
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      }}
    >
      <Typography variant="h5">{t("pleaseLoginToUseThisFeature")}</Typography>
    </Box>
  ) : (
    <>
      <Box
        sx={{ m: 1 }}
        p={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
        }}
      >
        <Typography variant="h5">{t("yourAllSets")}</Typography>
        <Grid container spacing={0.5} sx={{ mt: 1 }}>
          <Grid item xs={3}>
            <Card sx={{ width: 300, height: 200, mt: 1 }}>
              <CardActionArea
                sx={{ width: "100%", height: "100%" }}
                onClick={() => {
                  navigate("/create-set");
                }}
              >
                <CardContent>
                  <Stack direction="column" alignItems="center">
                    <AddIcon />
                    <Typography variant="body1">{t("createNewSet")}</Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {flashCardSets.map((set) => (
            <Grid
              item
              xs={3}
              sx={{
                ml: 5,
              }}
            >
              <Card key={set._id} sx={{ width: 300, height: 200, mt: 1 }}>
                <CardHeader
                  action={
                    <IconButton
                      aria-label="settings"
                      onClick={(e) => handleProfileMenuOpen(e, set._id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={set.name}
                />
                <CardActionArea
                  sx={{ width: "100%", height: "100%" }}
                  onClick={() => {
                    navigate(`/learn-flashcard/${set._id}`);
                  }}
                >
                  <CardContent>
                    <Box sx={{ m: 1.5 }}>
                      <Chip
                        label={
                          `${set.flashcards.length} ` +
                          (set.flashcards.length > 1 ? t("cards") : t("card"))
                        }
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        {renderMenu}
      </Box>
    </>
  );
}
