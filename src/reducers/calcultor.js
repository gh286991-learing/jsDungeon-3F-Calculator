import {
  GET_NUM,
  GET_ZERO,
  GET_ZERO_ZERO,
  GET_POINT,
} from '../actions/calcuator';


const initialState = {
  // isLoading: false,
  num: 0,
};


export default function calcultor(state = initialState, action) {
  switch (action.type) {
    case GET_NUM: {
      const numGet = action.num;
      const numBefore = state.num;
      const num = Number(numBefore + numGet);

      // console.log('state' ,state)
      return {
        ...state,
        num,
      };
    }
    case GET_ZERO: {
      const numBefore = state.num;
      const num = String(`${numBefore}0`);
      return {
        ...state,
        num,
      };
    }
    case GET_ZERO_ZERO: {
      const numBefore = state.num;
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
    default:
      return state;
  }
}
