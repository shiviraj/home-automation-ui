import { createContext, useContext, useEffect, useState } from 'react';
import { IS_AUTHENTICATED } from '../config/constant';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticate] = useState(false);

  useEffect(() => {
    try {
      setAuthenticate(JSON.parse(sessionStorage.getItem(IS_AUTHENTICATED)));
    } catch (error) {
      setAuthenticate(false);
    }
  }, []);

  const logout = async () => {
    sessionStorage.removeItem('isAuthenticated');
    setAuthenticate(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
