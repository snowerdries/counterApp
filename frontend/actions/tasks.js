import { DELETE_TASK } from '../constants';

export function deleteTask(task) {
  return {
    type: DELETE_TASK,
    task,
  };
}
