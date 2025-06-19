import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// React Router
import { BrowserRouter } from "react-router-dom";

// Ant Design
import { ConfigProvider } from "antd";
import locale from "antd/locale/tr_TR";

// Styles
import "./index.css";

createRoot(document.getElementById("root")).render(
  <ConfigProvider
    locale={locale}
    theme={{
      token: {
        colorPrimary: "#00BAF1",
      },
    }}
  >
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </BrowserRouter>
  </ConfigProvider>
);
