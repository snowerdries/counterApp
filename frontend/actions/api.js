import * as apiFunctions from '../api/apiFunctions.js';
import { RECIEVE_USER } from '../constants.js';
// import { browserHistory } from 'react-router';

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
      });
};

export const updateTask = (task, dispatch) => {
  apiFunctions.updateTask(task)
      .then((response) => {
        // const user = setUser(response.data);
        // dispatch(user);
        console.log(response, dispatch);
      });
};

