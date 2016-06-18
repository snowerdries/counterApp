import { RECIEVE_TASKS } from '../constants';

const initialState = [
  {
    id: 1,
    description: 'Taak 1',
  },
  {
    id: 2,
    description: 'Taak 2',
  },
];

export default function updateTasks(state = initialState, action) {
  if (action.type === RECIEVE_TASKS) {
    return action.tasks;
  }
  return state;
}
