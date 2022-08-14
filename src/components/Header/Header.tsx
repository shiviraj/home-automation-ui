import {useState} from 'react';
import {AppBar, Box, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBar from '../MenuBar/MenuBar';
import useMedia from '../../hooks/useMedia';

const Header = ({title}: { title: string }) => {
  const media = useMedia();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          {media.sm && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              data-testid={'menu-icon'}
              sx={{mr: 2}}
              onClick={handleOpen}
            >
              <MenuIcon/>
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            {title}
          </Typography>
          <MenuBar open={open} onClose={handleOpen}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;