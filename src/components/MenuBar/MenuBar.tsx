import {Drawer, MenuItem, Stack} from '@mui/material';
import useMedia from '../../hooks/useMedia';
import Link from 'next/link';
import {useUser} from "../../contexts/User";
import {useRouter} from "next/router";
import getMenuList from "./Menu.List";

const MenuItems = () => {
  const router = useRouter()
  const {user, logout} = useUser()

  if (user) {
    return <>
      {getMenuList(user.role).map((item, index) => <Link href={item.link} key={index}>
        <MenuItem key={index}>{item.label}</MenuItem>
      </Link>)}
      <div onClick={logout}>
        <MenuItem>Logout</MenuItem>
      </div>
    </>;
  }

  if (router.pathname === "/login") return <></>

  return <Link href={"/login"}><MenuItem>Login</MenuItem></Link>
};

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