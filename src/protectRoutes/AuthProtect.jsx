import { useContext } from "react";
import { isLoginContext } from "../contexts/LoginContext";
import { Navigate } from "react-router-dom";

export default function AuthProtect({ children }) {
  const { isLogin } = useContext(isLoginContext);
  return isLogin ? <Navigate to={"/"} /> : children;
}
