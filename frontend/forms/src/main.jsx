import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-center"
          richColors
          toastOptions={{ style: { borderRadius: "12px" } }}
        />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
