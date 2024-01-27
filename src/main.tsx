import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, Grow } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { RouterProvider } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import theme from "./config/themes/theme";
import router from "./config/router/router";
import { I18nextProvider } from "react-i18next";
import i18next from "./translation/i18next";
import { Provider } from "react-redux";
import { store } from "./store";
import { SnackbarProvider } from "notistack";
import SnackbarCloseButton from "./common/SnackBarCloseButton";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline>
      <SnackbarProvider
        TransitionComponent={Grow}
        autoHideDuration={5000}
        action={(snackbarKey) => (
          <SnackbarCloseButton snackbarKey={snackbarKey} />
        )}
      />
      <Provider store={store}>
        <I18nextProvider i18n={i18next}>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </I18nextProvider>
      </Provider>
    </CssBaseline>
  </React.StrictMode>
);
