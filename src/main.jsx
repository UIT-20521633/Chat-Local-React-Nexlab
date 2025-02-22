import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Cấu hình redux
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer position="bottom-left" theme="colored" autoClose="1000" />
  </Provider>
);
