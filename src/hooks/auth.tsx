import React, { createContext, useContext, useEffect, useState } from "react";
import { getAccessToken } from "../services/token";

// authContext props
interface AuthContextProps {
  isUserAuthenticated: boolean;
  setIsUserAuthenticated: (isUserAuthenticated: boolean) => void;
}

// This is the context that will be used by the components that need to access the auth state.
const AuthContext = createContext({} as AuthContextProps);

interface IAuthProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: IAuthProps) {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    // check if the user is authenticated every time the component is rendered
    setIsUserAuthenticated(!!getAccessToken());
  }, []);

  return {
    isUserAuthenticated,
    setIsUserAuthenticated,
  };
}
