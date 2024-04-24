import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // on the server
    return axios.create({
      baseURL: 'http://www.rewrlution.com/',
      headers: req.headers,
    });
  } else {
    // on the browser
    // we don't need to set headers, since the browser will set cookie for us
    return axios.create({
      baseURL: '/',
    });
  }
};

export default buildClient;
