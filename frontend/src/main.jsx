import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/responsive-grid.css";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { SnackProvider } from "./contexts/snackcontext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SnackProvider>
        <App />
      </SnackProvider>
    </BrowserRouter>
  </StrictMode>
);
