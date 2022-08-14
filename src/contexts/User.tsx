import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import {USER} from '../config/constant';

export type User = {}

type  UserContextInterface = { user: User, logout: () => Promise<void> }

const UserContext = createContext(null as UserContextInterface | null);

export function UserProvider({children}: PropsWithChildren) {
  const [user, setUser] = useState(null as User | null);

  useEffect(() => {
    try {
      setUser(JSON.parse(sessionStorage.getItem(USER)!));
    } catch (error) {
      setUser(null);
    }
  }, []);

  const logout = async () => {
    sessionStorage.removeItem(USER);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{user: user!, logout}}>{children}</UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);