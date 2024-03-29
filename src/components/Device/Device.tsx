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
        {option !== 'location' ? `${content.location} ` : ''}
        {content.name}
        {content.number !== 0 ? ` ${content.number}` : ''}
      </Typography>
      {content.type === "DIGITAL"
        ? <Switch
          checked={Boolean(content.value)}
          onChange={handleChange}
          disabled={content.control === "DISABLED"}/>
        : <Typography variant={"body1"}>{content.value}</Typography>
      }
    </Stack>
  );
};

export default Device;