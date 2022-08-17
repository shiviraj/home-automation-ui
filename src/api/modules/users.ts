import axios from '../adapter';
import {User} from "../../contexts/User";

const users = (BFF_URL: string) => ({

  login(payload: Document): Promise<{ token: string }> {
    const options = {method: 'POST'};
    return axios.fetch(`${BFF_URL}/login`, options, payload) as Promise<{ token: string }>;
  },

  validate(): Promise<User> {
    return axios.fetch(BFF_URL) as Promise<User>;
  }
});

export default users;