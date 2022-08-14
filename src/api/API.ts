import devices from './modules/devices';
import {BFF_URL} from "../config/constant";

const API = {
  devices: devices(`${BFF_URL}/api/devices`),
};

export default API;