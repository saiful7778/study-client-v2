import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import AuthContextProvider from "@/context/AuthContext";
import StateContextProvider from "@/context/StateContext";
import "@/assets/styles/global.css";
import App from "@/App";

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <StateContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </StateContextProvider>
    </StrictMode>,
  );
}
