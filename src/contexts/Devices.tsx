import {Context, createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import API from '../api/API';
import {DeviceInterface, sortDevices} from './utils';

type DeviceContextInterface = {
  devices: Record<string, Array<DeviceInterface>>,
  setOption: (option: string) => void,
  updateDevice: (devices: DeviceInterface) => void,
  option: string
};

const DevicesContext: Context<DeviceContextInterface | null> = createContext(null as DeviceContextInterface | null);

export const DevicesProvider = ({children, viewOption}: PropsWithChildren<{ viewOption: { value: string } }>) => {
  const [option, setOption] = useState(viewOption.value);
  const [allDevices, setAllDevices] = useState([] as Array<DeviceInterface>);
  const [devices, setDevices] = useState({} as Record<string, Array<DeviceInterface>>);
  const [count, setCount] = useState(0)

  useEffect(() => {
    API.devices.getAll()
      .then((devices: Array<DeviceInterface>) => setAllDevices(devices))
      .catch(() => setAllDevices([]))
  }, [count]);

  useEffect(() => {
    setTimeout(setCount, 300000, count + 1)
  }, [count])

  useEffect(() => {
    setDevices(sortDevices(allDevices, option));
  }, [option, allDevices]);

  const updateDevice = (device: DeviceInterface) => {
    setAllDevices([device, ...allDevices])
  }

  return (
    <DevicesContext.Provider value={{devices, updateDevice, setOption, option}}>
      {children}
    </DevicesContext.Provider>
  );
};

export const useDevices = () => useContext(DevicesContext)!;