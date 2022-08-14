import axios from 'axios';

export const initHeaders = () => {
  const {auth} = {auth: "bearer auth"};
  return {
    'Content-Type': 'application/json',
    authorization: auth,
  };
};

type Document = Record<string, any>

const adapter = {
  fetch: function (url: string, options?: Document, data?: Document | Array<Document>) {
    return new Promise((resolve, reject) => {
      axios({url, ...options, headers: initHeaders(), data})
        .then((res) => resolve(res.data))
        .catch((error) => reject(error.response && error.response.data));
    });
  },
};

export default adapter;