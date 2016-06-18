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
  {
    id: 3,
    description: 'Taak 3',
  },
  {
    id: 4,
    description: 'Taak 4',
  },
  {
    id: 5,
    description: 'Taak 5',
  },
  {
    id: 6,
    description: 'Taak 6',
  },
  {
    id: 7,
    description: 'Taak 7',
  },
  {
    id: 8,
    description: 'Taak 8',
  },
  {
    id: 9,
    description: 'Taak 9',
  },
  {
    id: 10,
    description: 'Taak 10',
  },
];

export default function updateTasks(state = initialState, action) {
  if (action.type === RECIEVE_TASKS) {
    return action.tasks;
  }
  return state;
}
