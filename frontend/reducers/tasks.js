import { RECIEVE_TASKS, RECIEVE_TASK, DELETE_TASK, ADD_TASK } from '../constants';
import * as _ from 'lodash';

const initialState = [];

export default function updateTasks(state = initialState, action) {
  if (action.type === RECIEVE_TASKS) {
    return action.tasks;
  }
  if (action.type === RECIEVE_TASK) {
    const newTasks = state.map((task) => {
      if (task.id === action.task.id) {
        return action.task;
      }
      return task;
    });
    return Object.assign([], state, newTasks);
  }
  if (action.type === DELETE_TASK) {
    const newTasks = _.filter(state, (task) => task.id !== action.task.id);
    return newTasks;
  }
  if (action.type === ADD_TASK) {
    const newTasks = state.push(action.task);
    return Object.assign([], state, newTasks);
  }
  return state;
}
