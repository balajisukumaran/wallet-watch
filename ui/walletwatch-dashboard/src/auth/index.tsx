import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

import { ROUTES } from "@/routes/constants";

type Props = {
  children: ReactNode;
};

type AuthContextType = {
  token: string;
  setToken: (token: string) => void;
};

const initialValue = { token: "", setToken: () => {} };

export const AuthContext = createContext<AuthContextType>(initialValue);

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken_] = useState(localStorage.getItem("token") || "");

  const setToken = (newToken: string) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const contextValue: AuthContextType = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ProtectedRoute = () => {
  const { token } = useAuth();
  return !token ? <Navigate to={ROUTES.LOGIN} /> : <Outlet />;
};

export const PublicRoute = () => {
  const { token } = useAuth();
  return !token ? <Outlet /> : <Navigate to={ROUTES.DASHBOARD} />;
};
