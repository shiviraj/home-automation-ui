import devices from './modules/devices';
import {BFF_URL} from "../config/constant";
import users from "./modules/users";

const API = {
  devices: devices(`${BFF_URL}/api/devices`),
  users: users(`${BFF_URL}/api/users`),
};

export default API;