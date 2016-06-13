import { INCREASE, DECREASE } from '../constants'

export function increase(n) {  
  console.log('increase');
  return {
    type: INCREASE,
    amount: n
  }
}

export function decrease(n) {
  return {
    type: DECREASE,
    amount: n
  }
}
