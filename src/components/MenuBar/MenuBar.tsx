import {Drawer, MenuItem, Stack} from '@mui/material';
import useMedia from '../../hooks/useMedia';
import menuList from './Menu.List';
import Link from 'next/link';

const MenuItems = () => (
  <>
    {menuList.map((item, index) => (
      <Link href={item.link} key={index}>
        <MenuItem key={index}>{item.label}</MenuItem>
      </Link>
    ))}
  </>
);

const MenuBar = ({open, onClose}: { readonly open: boolean, onClose: () => void }) => {
  const media = useMedia();

  if (media.sm) {
    return (
      <Drawer data-testid={'menubar-drawer'} open={open} onClose={onClose}>
        <MenuItems/>
      </Drawer>
    );
  }

  return (
    <Stack direction={'row'} data-testid={'menubar'}>
      <MenuItems/>
    </Stack>
  );
};

export default MenuBar;