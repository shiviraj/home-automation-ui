import React, {PropsWithChildren, useEffect, useState} from 'react';
import theme from '../theme';
import {ThemeProvider} from '@mui/styles';
import {CssBaseline} from '@mui/material';
import Layout from '../components/Layout/Layout';
import {UserProvider, useUser} from '../contexts/User';
import HeadTag from '../components/HeadTag/HeadTag';
import {ADMIN_PAGES, TITLE} from '../config/constant';
import {AppProps} from "next/app";
import {WebSocketProvider} from "../contexts/WebSocket";
import HomePage from "./index";
import {useRouter} from "next/router";

const ValidatedPage = ({setAllowed, children}: PropsWithChildren<{ setAllowed: (allowed: boolean) => void }>) => {
  const {user} = useUser()
  const router = useRouter()

  useEffect(() => {
    const isAdminPage = ADMIN_PAGES.some((page) => router.pathname.startsWith(page))
    const allowed = isAdminPage ? user?.role === "ADMIN" : true
    setAllowed(allowed)
    if (isAdminPage && user?.role !== "ADMIN")
      router.push("/").then()
  }, [])

  return <>{children}</>
}

const MyApp = ({Component, pageProps}: AppProps) => {
  const [allowed, setAllowed] = useState(false)

  return <>
    <HeadTag title={TITLE}/>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <WebSocketProvider>
        <UserProvider>
          <Layout title={TITLE}>
            <ValidatedPage setAllowed={setAllowed}>
              {
                allowed
                  ? <Component {...pageProps}/>
                  : <HomePage/>
              }
            </ValidatedPage>
          </Layout>
        </UserProvider>
      </WebSocketProvider>
    </ThemeProvider>
  </>;
};

export default MyApp;