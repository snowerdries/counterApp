import { DELETE_TASK, ADD_TASK } from '../constants';

export function deleteTask(task) {
  return {
    type: DELETE_TASK,
    task,
  };
}

export function addTask(task) {
  return {
    type: ADD_TASK,
    task,
  };
}
