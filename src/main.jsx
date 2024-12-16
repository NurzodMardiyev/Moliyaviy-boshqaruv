import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import ContextApiProvider from "./context/ContextApi";

const client = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={client}>
    <ContextApiProvider>
      <App />
    </ContextApiProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
