import Header from '../Header/Header';
import {Box} from '@mui/material';
import {PropsWithChildren} from "react";

const Layout = ({children, title}: PropsWithChildren<{ title: string }>) => {
  return (
    <article>
      <Header title={title}/>
      <Box data-testid={'main-layout'}>{children}</Box>
    </article>
  );
};

export default Layout;