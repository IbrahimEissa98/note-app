import { createContext, useState } from "react";

export const isLoginContext = createContext();

export default function LoginContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("token") != null);
  return (
    <isLoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </isLoginContext.Provider>
  );
}
