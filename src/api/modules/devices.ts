import axios from '../adapter';
import {DeviceInterface, State} from "../../contexts/utils";

const devices = (BFF_URL: string) => ({

  getAll(): Promise<Array<DeviceInterface>> {
    return axios.fetch<Array<DeviceInterface>>(BFF_URL)
  },

  updateState(device: DeviceInterface, state: State): Promise<DeviceInterface> {
    const options = {method: 'PUT'};
    return axios.fetch<DeviceInterface>(BFF_URL, options, {device, state})
  }

});

export default devices;