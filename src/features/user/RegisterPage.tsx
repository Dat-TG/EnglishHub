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
      style={{ minHeight: "100vh", marginBottom: "48px" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper
          elevation={3}
          style={{ padding: "32px", borderRadius: "7px", textAlign: "center" }}
        >
          {/* Register form */}
          <RegisterForm />
          <div
            className="or-divider"
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              padding: "25px",
            }}
          >
            <span
              className="divider-line"
              style={{ flexGrow: 1, height: "1px", background: "#ccc" }}
            ></span>
          </div>

          <Stack
            spacing={0.5}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            justifyContent={"center"}
            marginTop={"10px"}
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
}

export default RegisterPage;
