import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import {AUTH, USER} from '../config/constant';
import API from "../api/API";
import {useRouter} from "next/router";
import {Box, CircularProgress} from "@mui/material";

export type User = { _id?: string, username: string, name: string, email: string, role: "ADMIN" | "USER" }

type UserContextInterface = { user: User, updateUser: (user: User) => void, logout: () => Promise<void> }

const UserContext = createContext(null as UserContextInterface | null);

export const UserProvider = ({children}: PropsWithChildren) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null as User | null);
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    API.users.validate()
      .then((user) => {
        setUser(user);
        if (router.pathname.startsWith("/login"))
          return router.push("/")
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false))

  }, [router.pathname]);

  useEffect(() => {
    if (user === null) {
      router.push("/login").then()
    }
  }, [user])

  const logout = async () => {
    sessionStorage.removeItem(USER);
    sessionStorage.removeItem(AUTH);
    await router.push("/login")
    setUser(null)
  };

  if (loading) {
    return <Box sx={{display: 'flex'}}>
      <CircularProgress/>
    </Box>
  }

  return (
    <UserContext.Provider value={{user: user!, updateUser: setUser, logout}}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext)!;