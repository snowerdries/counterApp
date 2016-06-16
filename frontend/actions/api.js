import * as apiFunctions from '../api/apiFunctions.js';
import { RECIEVE_USER } from '../constants.js';

export const setUser = (user) => ({
  type: RECIEVE_USER,
  user,
});

export const doAuthenticate = (dispatch) => {
  console.log('test1');
  apiFunctions.doAuthenticate()
      .then((response) => {
        const user = setUser(response.data);
        dispatch(user);
      })
      .catch((err) => {
        console.log('USER FAILURE', err); //eslint-disable-line
      });
};

