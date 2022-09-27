import axios from 'axios';
import {getStorage} from "../utils/storage";
import {AUTH} from "../config/constant";

const initHeaders = () => {
  const {token} = getStorage<{ token: string }>(AUTH)
  return {
    'Content-Type': 'application/json',
    authorization: token || "token",
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  };
};

export type Document = Record<string, any>

const adapter = {
  fetch<ResultType extends Record<string, any>>(url: string, options?: Document, data?: Document | Array<Document>): Promise<ResultType> {
    return new Promise((resolve, reject) => {
      axios({url, ...options, headers: initHeaders(), data})
        .then((res) => resolve(res.data))
        .catch((error) => reject(error.response && error.response.data))
    });
  },
};

export default adapter;