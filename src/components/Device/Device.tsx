import {Stack, Switch, Typography} from '@mui/material';
import {useDevices} from '../../contexts/Devices';
import {DeviceInterface, State} from "../../contexts/utils";
import {useWebSocket, WSEvent} from "../../contexts/WebSocket";

const Device = ({content}: { content: DeviceInterface }) => {
  const {option} = useDevices();
  const {send} = useWebSocket()

  const handleChange = (event: { target: { checked: boolean } }) => {
    const state = event.target.checked ? State.ON : State.OFF
    send({event: WSEvent.UPDATE_STATE, data: {state, device: content}})
  };

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} height={40}>
      <Typography variant={'body1'}>
        {option === 'name' ? `${content.location} ` : ''}
        {content.name}
        {content.number !== 0 ? ` ${content.number}` : ''}
      </Typography>
      {content.type === 'OUTPUT' ? (
        <Switch
          checked={content.value === 1}
          onChange={handleChange}
          inputProps={{'aria-label': 'controlled'}}
        />
      ) : (
        <Typography variant={'body1'} mr={3}>
          {content.value}
        </Typography>
      )}
    </Stack>
  );
};

export default Device;