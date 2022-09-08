import Header from '../Header/Header';
import {Box} from '@mui/material';
import {PropsWithChildren} from "react";
import {useUser} from "../../contexts/User";

const Layout = ({children, title}: PropsWithChildren<{ title: string }>) => {
  const {user} = useUser()
  return (
    <article>
      {user && <Header title={title}/>}
      <Box data-testid={'main-layout'}>{children}</Box>
    </article>
  );
};

export default Layout;