import {
  GET_NUM,
  GET_ZERO,
  GET_ZERO_ZERO,
  GET_POINT,
  PRESS_AC,
  PRESS_BACK,
  GET_PLUS,
  PRESS_CALCULATE,
} from '../actions/calcuator';


const initialState = {
  num: 0,
  deputy: 0,
};


export default function calcultor(state = initialState, action) {
  switch (action.type) {
    case GET_NUM: {
      const numGet = action.num;
      const numBefore = state.num;
      const deputyBefore = String(state.deputy);
      const num = Number(numBefore + numGet);

      const deputy = ((deputyBefore === 0 ? numBefore : deputyBefore) + numGet).replace(/\b(0)/g, '');


      return {
        ...state,
        num,
        deputy,
      };
    }
    case GET_ZERO: {
      const numBefore = state.num;
      const deputyBefore = String(state.deputy);


      if (numBefore === 0) {
        return state;
      }


      const deputy = String(`${deputyBefore}0`);
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

    case GET_PLUS: {
      const numBefore = String(state.num);
      const deputyBefore = String(state.deputy);

      if (numBefore === '0') {
        return state;
      }

      if (deputyBefore === '0') {
        return {
          ...state,
          num: 0,
          deputy: `${numBefore}+`,
        };
      }

      const deputy = `${deputyBefore}+`;

      return {
        ...state,
        num: 0,
        deputy,
      };
    }

    case PRESS_CALCULATE: {
      const deputy = String(state.deputy);
      const lastIndex = deputy.length - 1;
      const lastN = Number(deputy.charAt(lastIndex));

      const formula = isNaN(lastN) ? deputy.substring(0, lastIndex) : deputy;
      const result = eval(formula);

      return {
        ...state,
        num: result,
        deputy: 0,
      };
    }

    default:
      return state;
  }
}
