import * as axios from 'axios';
const authUrl = `${window.location.origin}/api/user`;

export const doAuthenticate = () => {
  console.log('testje');
  return axios.get(authUrl, { headers: { 'Access-Control-Allow-Origin': '*' } });
};
