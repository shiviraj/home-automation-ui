import { useMediaQuery } from '@mui/material';

const useMedia = () => {
  const sm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const md = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const lg = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  return { sm, md, lg };
};

export default useMedia;
