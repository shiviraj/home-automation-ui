import React from 'react';
import theme from '../theme';
import {ThemeProvider} from '@mui/styles';
import {CssBaseline} from '@mui/material';
import Layout from '../components/Layout/Layout';
import {UserProvider} from '../contexts/User';
import HeadTag from '../components/HeadTag/HeadTag';
import {TITLE} from '../config/constant';
import {AppProps} from "next/app";
import {WebSocketProvider} from "../contexts/WebSocket";

const MyApp = ({Component, pageProps}: AppProps) => {

  return (
    <>
      <HeadTag title={TITLE}/>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <WebSocketProvider>
          <UserProvider>
            <Layout title={TITLE}>
              <Component {...pageProps} />
            </Layout>
          </UserProvider>
        </WebSocketProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;