import PropTypes from 'prop-types';
import Header from '../Header/Header';
import { Box } from '@mui/material';

const Layout = ({ children, title }) => {
  return (
    <article>
      <Header title={title} />
      <Box data-testid={'main-layout'}>{children}</Box>
    </article>
  );
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Layout;
