import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline>
      <I18nextProvider i18n={i18next}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </I18nextProvider>
    </CssBaseline>
  </React.StrictMode>
);
