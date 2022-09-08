import axios, {Document} from '../adapter';
import {User} from "../../contexts/User";

const users = (BFF_URL: string) => ({

  login(payload: Document): Promise<{ token: string }> {
    const options = {method: 'POST'};
    return axios.fetch(`${BFF_URL}/login`, options, payload) as Promise<{ token: string }>;
  },

  validate(): Promise<User> {
    return axios.fetch(`${BFF_URL}/validate`) as Promise<User>;
  },

  getUsers() {
    return axios.fetch(BFF_URL) as Promise<Array<User>>;
  },

  isUsernameAvailable(username: string): Promise<{ status: boolean }> {
    const options = {method: 'POST'};
    return axios.fetch(`${BFF_URL}/username-available`, options, {username}) as Promise<{ status: boolean }>
  },

  addUser(user: Document): Promise<User> {
    const options = {method: "POST"}
    return axios.fetch(BFF_URL, options, user) as Promise<User>
  },

  updatePassword(values: { password: string; oldPassword: string }): Promise<{ error: boolean, message: string }> {
    const options = {method: "PUT"}
    return axios.fetch(`${BFF_URL}/update-password`, options, values) as Promise<{ error: boolean, message: string }>
  },
  updateProfile(values: { name: string; email: string; username: string }): Promise<{ error: boolean, message: string }> {
    const options = {method: "PUT"}
    return axios.fetch(BFF_URL, options, values) as Promise<{ error: boolean, message: string }>
  }
});

export default users;