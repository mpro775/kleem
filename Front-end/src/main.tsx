import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme/theme"; // استيراد الثيم
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import createCache from "@emotion/cache";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import * as Sentry from "@sentry/react";

// 1) إنشاء Emotion cache مع RTL
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [stylisRTLPlugin],
});
Sentry.init({
  dsn: "https://YOUR_SENTRY_DSN",
  integrations: [
    Sentry.browserTracingIntegration(),
    // Sentry.replayIntegration(), // لو تريد Replay
  ],
  tracesSampleRate: 1.0, // اضبطها حسب الحاجة (مثلاً 0.2)
  // replaysSessionSampleRate: 0.1,
  // replaysOnErrorSampleRate: 1.0,
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <App />
          </AuthProvider>

          <ToastContainer position="top-center" rtl />
        </ThemeProvider>
      </CacheProvider>
    </BrowserRouter>
  </React.StrictMode>
);
