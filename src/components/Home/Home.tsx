import React, {useEffect} from 'react';
import {Box, Card, Theme, Typography} from '@mui/material';
import Device from '../Device/Device';
import {useDevices} from '../../contexts/Devices';
import {styled} from '@mui/styles';
import {useWebSocket, WSEvent} from "../../contexts/WebSocket";
import {DeviceInterface} from "../../contexts/utils";

const Container = styled(Box)(({theme}: { theme: Theme }) => ({
  margin: 0,
  padding: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 345px)',
  gridAutoRows: theme.spacing(1),
  justifyContent: 'center',
}));

const CardContainer = styled(Card)(({theme, rows}: { theme: Theme, rows: number }) => {
  return {
    margin: theme.spacing(1),
    gridRowEnd: `span ${rows * 5 + 7}`,
    border: `1px solid ${theme.palette.grey[300]}`,
  };
});

const Home = () => {
  const {devices, updateDevice} = useDevices();
  const ws = useWebSocket()
  const keys = Object.keys(devices).sort();

  useEffect(() => {
    if (ws.data?.event === WSEvent.UPDATE_STATE) {
      updateDevice(ws.data.data as DeviceInterface)
    }
  }, [ws.data])

  return (
    <Container>
      {keys.map((keyName, index) => (
        <CardContainer key={index} rows={devices[keyName].length}>
          <Typography variant={'h5'} mt={1} ml={2}>
            {keyName}
          </Typography>
          <Box ml={2}>
            {devices[keyName].map((content, index) => (
              <Device key={index} content={content}/>
            ))}
          </Box>
        </CardContainer>
      ))}
    </Container>
  );
};

export default Home;