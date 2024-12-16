import { createContext, useState } from "react";

export const contextsTransaction = createContext();

export default function ContextApiProvider({ children }) {
  const [valyutes, setValyutes] = useState([]);
  return (
    <contextsTransaction.Provider value={{ valyutes, setValyutes }}>
      {children}
    </contextsTransaction.Provider>
  );
}
