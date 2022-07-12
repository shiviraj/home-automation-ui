import React from 'react';
import PropTypes from 'prop-types';
import theme from '../theme';
import { ThemeProvider } from '@mui/styles';
import { CssBaseline } from '@mui/material';
import Layout from '../components/Layout/Layout';
import { AuthProvider } from '../contexts/Auth';
import HeadTag from '../components/HeadTag/HeadTag';
import { TITLE } from '../config/constant';

const MyApp = (props) => {
  const { Component, pageProps } = props;

  return (
    <>
      <HeadTag title={TITLE} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Layout title={TITLE}>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

MyApp.prototype = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
