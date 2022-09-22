import {Stack, Switch, Typography} from '@mui/material';
import API from '../../api/API';
import {useDevices} from '../../contexts/Devices';
import {DeviceInterface, State} from "../../contexts/utils";

const Device = ({content}: { content: DeviceInterface }) => {
  const {option, updateDevice} = useDevices();

  const handleChange = (event: { target: { checked: boolean } }) => {
    const state = event.target.checked ? State.ON : State.OFF
    API.devices.updateState(content, state)
      .then(device => updateDevice(device))
  };

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} height={40}>
      <Typography variant={'body1'}>
        {option === 'name' ? `${content.location} ` : ''}
        {content.name}
        {content.number !== 0 ? ` ${content.number}` : ''}
      </Typography>
      <Switch
        checked={content.value === 1}
        onChange={handleChange}
        disabled={content.mode === "INPUT"}
      />
    </Stack>
  );
};

export default Device;