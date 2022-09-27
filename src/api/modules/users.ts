import axios, {Document} from '../adapter';
import {User} from "../../contexts/User";

const users = (BFF_URL: string) => ({

  login(payload: Document): Promise<{ token: string }> {
    const options = {method: 'POST'};
    return axios.fetch<{ token: string }>(`${BFF_URL}/login`, options, payload)
  },

  validate(): Promise<User> {
    return axios.fetch<User>(`${BFF_URL}/validate`)
  },

  getUsers(): Promise<Array<User>> {
    return axios.fetch<Array<User>>(BFF_URL)
  },

  isUsernameAvailable(username: string): Promise<{ status: boolean }> {
    const options = {method: 'POST'};
    return axios.fetch<{ status: boolean }>(`${BFF_URL}/username-available`, options, {username})
  },

  addUser(user: Document): Promise<User> {
    const options = {method: "POST"}
    return axios.fetch<User>(BFF_URL, options, user)
  },

  updatePassword(values: { password: string; oldPassword: string }): Promise<{ error: boolean, message: string }> {
    const options = {method: "PUT"}
    return axios.fetch<{ error: boolean, message: string }>(`${BFF_URL}/update-password`, options, values)
  },
  updateProfile(values: { name: string; email: string; username: string }): Promise<{ error: boolean, message: string }> {
    const options = {method: "PUT"}
    return axios.fetch<{ error: boolean, message: string }>(BFF_URL, options, values)
  }
});

export default users;