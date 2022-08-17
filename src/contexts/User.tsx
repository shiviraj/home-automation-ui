import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import {AUTH, USER} from '../config/constant';
import API from "../api/API";
import {getStorage} from "../utils/storage";
import {useRouter} from "next/router";
import {Box, CircularProgress} from "@mui/material";

export type User = {}

type UserContextInterface = { user: User, logout: () => Promise<void> }

const UserContext = createContext(null as UserContextInterface | null);

export const UserProvider = ({children}: PropsWithChildren) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null as User | null);
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    const token = getStorage(AUTH)
    if (!token.hasOwnProperty("token") && !router.pathname.startsWith("/login")) {
      router.push("/login").then()
      return
    }

    API.users.validate()
      .then((user) => {
        setUser(user);
        if (router.pathname.startsWith("/login"))
          return router.push("/")
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false))

  }, []);

  const logout = async () => {
    sessionStorage.removeItem(USER);
    setUser(null);
  };

  if (loading) {
    return <Box sx={{display: 'flex'}}>
      <CircularProgress/>
    </Box>
  }

  return (
    <UserContext.Provider value={{user: user!, logout}}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);