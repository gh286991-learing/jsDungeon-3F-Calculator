export const GET_NUM = 'GET_NUM';
export const GET_ZERO = 'GET_ZERO';
export const GET_ZERO_ZERO = 'GET_ZERO_ZERO';
export const GET_POINT = 'GET_POINT';
export const PRESS_AC = 'PRESS_AC';
export const PRESS_BACK = 'PRESS_BACK';
export const GET_PLUS = 'GET_PLUS';
export const PRESS_CALCULATE = 'PRESS_CALCULATE';


export function getNum(num) {
  return {
    type: GET_NUM,
    num,
  };
}

export function getZero() {
  return {
    type: GET_ZERO,
  };
}

export function getZeroZero() {
  return {
    type: GET_ZERO_ZERO,
  };
}

export function getPoint() {
  return {
    type: GET_POINT,
  };
}

export function pressAC() {
  return {
    type: PRESS_AC,
  };
}

export function pressBack() {
  return {
    type: PRESS_BACK,
  };
}

export function getPlus() {
  return {
    type: GET_PLUS,
  };
}

export function pressCalculate() {
  return {
    type: PRESS_CALCULATE,
  };
}
