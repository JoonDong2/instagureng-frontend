import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ isLoggedIn: isLoggedInProp = false, children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn;
};

export const useSetIsLoggedIn = () => {
    const { setIsLoggedIn } = useContext(AuthContext);
    return setIsLoggedIn;
}