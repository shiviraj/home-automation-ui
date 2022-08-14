import {Theme, useMediaQuery} from '@mui/material';

export type Media = { lg: boolean, md: boolean, sm: boolean }

const useMedia = (): Media => {
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const lg = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  return {sm, md, lg};
};

export default useMedia;