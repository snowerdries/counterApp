import * as axios from 'axios';
const authUrl = `${window.location.origin}/api/user`;
const logOutUrl = `${window.location.origin}/api/user/logout`;

export const doAuthenticate = () => {
  console.log('singin');
  return axios.get(authUrl, { headers: { 'Access-Control-Allow-Origin': '*' } });
};

export const doLogout = () => {
  console.log('logout');
  return axios.get(logOutUrl, { headers: { 'Access-Control-Allow-Origin': '*' } });
};
