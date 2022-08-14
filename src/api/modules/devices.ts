import axios from '../adapter';
import {DeviceInterface, State} from "../../contexts/utils";

const devices = (BFF_URL: string) => ({

  getAll(): Promise<Array<DeviceInterface>> {
    return axios.fetch(BFF_URL) as Promise<Array<DeviceInterface>>;
  },

  updateState(device: DeviceInterface, state: State): Promise<DeviceInterface> {
    const options = {method: 'PUT', data: {device, state}};
    return axios.fetch(BFF_URL, options) as Promise<DeviceInterface>;
  }

});

export default devices;