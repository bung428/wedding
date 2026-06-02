import "regenerator-runtime/runtime";
import ReactDOM from "react-dom/client";
import "./tailwind.css";
import App from "./App";
import { ToastProvider } from "./components/ToastProvider";

const rootElement = document.querySelector("#root") as Element;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ToastProvider>
      <App />
    </ToastProvider>,
  );
}
