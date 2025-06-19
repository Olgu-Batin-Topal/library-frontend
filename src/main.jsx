import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// React Router
import { BrowserRouter } from "react-router-dom";

// Ant Design
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import locale from "antd/locale/tr_TR";

// Toastify
import { ToastContainer, Slide } from "react-toastify";

// TanStack Query
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./services/queryClient.jsx";

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
    <QueryClientProvider client={queryClient}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <App />

        <ToastContainer
          position="top-center"
          autoClose={3000}
          limit={3}
          newestOnTop={true}
          closeOnClick
          theme="light"
          transition={Slide}
        />
      </BrowserRouter>
    </QueryClientProvider>
  </ConfigProvider>
);
