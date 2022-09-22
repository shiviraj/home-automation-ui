import devices from './modules/devices';
import users from "./modules/users";

const API = {
  devices: devices(`/api/devices`),
  users: users(`/api/users`),
};

export default API;