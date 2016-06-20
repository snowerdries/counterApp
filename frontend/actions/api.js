import * as apiFunctions from '../api/apiFunctions.js';
import { RECIEVE_USER, RECIEVE_TASK } from '../constants.js';
// import { browserHistory } from 'react-router';

export const setUser = (user) => ({
  type: RECIEVE_USER,
  user,
});

export const setTask = (task) => ({
  type: RECIEVE_TASK,
  task,
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
      const taskResp = response.data;
      dispatch(setTask(taskResp));
    });
};

