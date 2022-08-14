import {useEffect, useState} from 'react';
import {Divider, Stack} from '@mui/material';
import SelectViewOptions from '../components/SelectViewOptions/SelectViewOptions';
import Home from '../components/Home/Home';
import {DevicesProvider, useDevices} from '../contexts/Devices';
import {NextPage} from "next";

const viewOptions: Array<{ label: string, value: string }> = [
  {label: 'Rooms', value: 'location'},
  {label: 'Devices', value: 'name'},
  {label: 'Boards', value: 'nodeMcu'},
];

const DevicesWithOption = () => {
  const [index, setIndex] = useState(0);
  const {setOption} = useDevices();

  useEffect(() => {
    setOption(viewOptions[index].value);
  }, [index, setOption]);

  return (
    <Stack>
      <SelectViewOptions
        option={viewOptions[index].value}
        options={viewOptions}
        setIndex={setIndex}
      />
      <Divider/>
      <Home/>
    </Stack>
  );
};

const HomePage: NextPage = () => (
  <DevicesProvider viewOption={viewOptions[0]}>
    <DevicesWithOption/>
  </DevicesProvider>
);

export default HomePage;