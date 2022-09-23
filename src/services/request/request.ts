import Axios from 'axios';


const request = Axios.create();
request.interceptors.request.use(async (config) => {
 // const user = await Auth.currentSession();
  //const token = user.getIdToken().getJwtToken();
  // eslint-disable-next-line no-param-reassign
  config.headers = {
    'Authorization': `Bearer ${token}`,
  };
  return config;
});

// eslint-disable-next-line import/prefer-default-export
export { request };
