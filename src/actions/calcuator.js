export const GET_NUM = 'GET_NUM';
export const GET_ZERO = 'GET_ZERO';
export const GET_ZERO_ZERO = 'GET_ZERO_ZERO';
export const GET_POINT = 'GET_POINT';


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
