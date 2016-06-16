import { RECIEVE_USER } from '../constants';

const initialState = {
};

export default function update(state = initialState, action) {
  if (action.type === RECIEVE_USER) {
    return action.user;
  }
  return state;
}
