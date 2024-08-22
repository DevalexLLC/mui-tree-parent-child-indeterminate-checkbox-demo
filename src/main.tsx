import { StyledEngineProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import TreeProvider from "./context/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <TreeProvider>
        <App />
      </TreeProvider>
    </StyledEngineProvider>
  </StrictMode>
);
