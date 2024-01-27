import { Grid, Paper, Stack, Typography } from "@mui/material";
import LogInForm from "../../components/user/LoginForm";
import { useTranslation } from "react-i18next";
import { Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { sGetUserInfo } from "../../store/user/selector";

const LoginPage = () => {
  const { t } = useTranslation("global");
  useEffect(() => {
    document.title = t("logIn");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const user = useSelector(sGetUserInfo);
  if (user != null) {
    return <Navigate to={"/dictionary"} />;
  }
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "80vh", marginBottom: "48px" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper
          elevation={3}
          style={{ padding: "32px", borderRadius: "7px", textAlign: "center" }}
        >
          <LogInForm />

          <Stack
            spacing={0.5}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            justifyContent={"center"}
            marginTop={"24px"}
          >
            <Typography>{t("notAMemberYet")}</Typography>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#0074D9" }}
            >
              {t("register")}
            </Link>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
