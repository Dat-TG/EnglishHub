import { Grid, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import RegisterForm from "../../components/user/RegisterForm";

const RegisterPage = () => {
  useEffect(() => {
    document.title = "Register";
  }, []);

  const { t } = useTranslation("global");

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
