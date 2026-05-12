import { createContext } from "react";
import { BrowserRouter } from "react-router-dom";
//import "./App.css";

import { useToast }  from "./hooks/usetoast";
import Toast         from "./components/Toast";
import AppRoutes     from "./etc/routes";

/** Shared toast context — consumed with useContext(ToastContext) in any page */
export const ToastContext = createContext(() => {});

export default function App() {
  const { toasts, add: toast } = useToast();

  return (
    <ToastContext.Provider value={toast}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toast toasts={toasts} />
    </ToastContext.Provider>
  );
}