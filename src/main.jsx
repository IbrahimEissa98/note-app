import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import { HeroUIProvider } from "@heroui/react";
import LoginContextProvider from "./contexts/LoginContext.jsx";
import { ToastProvider } from "@heroui/toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider />
      <LoginContextProvider>
        <App />
      </LoginContextProvider>
    </HeroUIProvider>
  </StrictMode>
);
