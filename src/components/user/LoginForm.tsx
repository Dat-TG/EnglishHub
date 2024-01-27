import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getUserProfile, loginUser } from "../../store/user/thunkApi";
import { emailPattern } from "../../utils/helpers";

type Inputs = {
  email: string;
  password: string;
};

function LogInForm() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Log In";
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    await dispatch(
      loginUser({
        email: data.email,
        password: data.password,
      })
    );
    await dispatch(getUserProfile());
    setIsLoading(false);
  };

  const [showPassword, setShowPassword] = useState(false);

  const { t } = useTranslation("global");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" align="center" fontWeight={"bold"}>
        {t("logIn")}
      </Typography>
      <Controller
        name="email"
        control={control}
        rules={{
          required: true,
          pattern: emailPattern,
        }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            style={{ marginTop: "48px" }}
            {...field}
            label="Email"
            fullWidth
            type="email"
            variant="outlined"
            error={!!errors.email}
            placeholder="email@example.com"
            helperText={errors.email ? t("emailValidationMessage") : ""}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true, minLength: 6 }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            style={{ marginTop: "32px" }}
            {...field}
            label={t("password")}
            fullWidth
            variant="outlined"
            error={!!errors.password}
            helperText={
              errors.password
                ? errors.password.type == "required"
                  ? t("requiredField")
                  : t("passwordValidate")
                : ""
            }
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ display: field.value ? "flex" : "none" }}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "32px" }}
        size="large"
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress size={30} style={{ color: "white" }} />
        ) : (
          <Typography fontSize={"16px"}>{t("logInUppercase")}</Typography>
        )}
      </Button>
    </form>
  );
}

export default LogInForm;
