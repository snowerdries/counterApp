import { INCREASE, DECREASE } from '../constants';

const initialState = {
  aantal: 1,
};

export default function update(state = initialState, action) {
  if (action.type === INCREASE) {
    return { aantal: state.aantal + action.amount };
  } else if (action.type === DECREASE) {
    return { aantal: state.aantal - action.amount };
  }
  return state;
}
