import { Grid, Paper, Stack, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import RegisterForm from "../../components/user/RegisterForm";
import { useSelector } from "react-redux";
import { sGetUserInfo } from "../../store/user/selector";

const RegisterPage = () => {
  const { t } = useTranslation("global");

  useEffect(() => {
    document.title = t("register");
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
      style={{ minHeight: "100vh", marginBottom: "48px", marginTop: "48px" }}
    >
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Paper
          elevation={3}
          style={{ padding: "32px", borderRadius: "8px", textAlign: "center" }}
        >
          {/* Register form */}
          <RegisterForm />

          <Stack
            spacing={0.5}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            justifyContent={"center"}
            marginTop={"24px"}
          >
            <Typography>{t("alreadyHaveAnAccount")}</Typography>
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "#0074D9" }}
            >
              {t("logIn")}
            </Link>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
