import { useContext } from "react";
import { isLoginContext } from "../contexts/LoginContext";
import { Navigate } from "react-router-dom";

export default function MainProtect({ children }) {
  const { isLogin } = useContext(isLoginContext);
  return isLogin ? children : <Navigate to={"/login"} />;
}
