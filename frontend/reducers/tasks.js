import { RECIEVE_TASKS, RECIEVE_TASK } from '../constants';

const initialState = [
  {
    id: 1,
    description: 'Vaatwasser opzetten',
  },
  {
    id: 2,
    description: 'Aardappelen schillen en spinaziepurree maken',
  },
  {
    id: 3,
    description: 'Speelgoed opruimen',
  },
  {
    id: 4,
    description: 'Kindjes in bad steken. Arthur zijn haar wassen',
  },
  {
    id: 5,
    description: 'Boekentas uitladen',
  },
  {
    id: 6,
    description: 'Rusten',
  },
  {
    id: 7,
    description: 'Groenafval buitenzetten',
  },
  {
    id: 8,
    description: 'Vuilbakken buitenzetten',
  },
  {
    id: 9,
    description: 'Gazon afrijden',
  },
  {
    id: 10,
    description: 'TV kijken',
  },
];

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
  return state;
}
