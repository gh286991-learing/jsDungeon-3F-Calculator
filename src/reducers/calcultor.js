import {
  GET_NUM,
  GET_ZERO,
  GET_ZERO_ZERO,
  GET_POINT,
  PRESS_AC,
  PRESS_BACK,
} from '../actions/calcuator';


const initialState = {
  num: 0,
  deputy : 0
};


export default function calcultor(state = initialState, action) {
  switch (action.type) {
    case GET_NUM: {
      const numGet = action.num;
      const numBefore = state.num;
      const deputyBefore = String(state.deputy)
      const num = Number(numBefore + numGet);
      const deputy = (deputyBefore + numGet).replace(/\b(0+)/g,"")

      return {
        ...state,
        num,
        deputy,
      };
    }
    case GET_ZERO: {
      const numBefore = state.num;
      const deputyBefore = String(state.deputy)
 

      if (numBefore === 0) {
        return state;
      }
      const deputy = String(`${deputyBefore}0`)
      const num = String(`${numBefore}0`);
      return {
        ...state,
        num,
        deputy,
      };
    }
    case GET_ZERO_ZERO: {
      const numBefore = state.num;

      if (numBefore === 0) {
        return state;
      }

      const num = String(`${numBefore}00`);
      return {
        ...state,
        num,
      };
    }
    case GET_POINT: {
      const numBefore = String(state.num);

      if (numBefore.indexOf('.') > 0) {
        return state;
      }

      const num = String(`${numBefore}.`);
      return {
        ...state,
        num,
      };
    }

    case PRESS_AC: {
      const num = 0;
      return {
        ...state,
        num,
      };
    }

    case PRESS_BACK: {
      const numBefore = String(state.num);
      const numLength = numBefore.length;

      const num = numLength === 1 ? 0 : numBefore.substring(0, numLength - 1);

      return {
        ...state,
        num,
      };
    }

    default:
      return state;
  }
}
