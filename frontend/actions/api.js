import * as apiFunctions from '../api/apiFunctions.js';
import { RECIEVE_USER } from '../constants.js';
import { browserHistory } from 'react-router';

export const setUser = (user) => ({
  type: RECIEVE_USER,
  user,
});

export const doAuthenticate = (dispatch) => {
  apiFunctions.doAuthenticate()
      .then((response) => {
        const user = setUser(response.data);
        dispatch(user);
      })
      .catch((err) => {
        console.log('USER FAILURE', err); //eslint-disable-line
      });
};

export const doLogout = (dispatch) => {
  apiFunctions.doLogout()
      .then((response) => {
        const user = setUser(response.data);
        dispatch(user);
        browserHistory.push('/login');
      });
};

