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

import toPostfix from '../tools/trsPostfix';

const initialState = {
  nums: {
    acc: 0,
    last: 0,
    curr: 0,
  },

  deputy: null,
  operatored: false,
  operator: null,
  calcuator: {
    acc: 0,
    brackets: 0,
  },
};


export default function calcultor(state = initialState, action) {
  switch (action.type) {
    case GET_NUM: {
      const numInput = action.num;
      const { operatored, nums } = state;
      const { acc, curr, last } = nums;

      const num = !operatored ? Number(curr + numInput) : Number(numInput);

      return {
        ...state,
        nums: {
          ...nums,
          curr: num,
        },
        operatored: false,
      };
    }

    case GET_ZERO: {
      const numBefore = state.num;


      if (numBefore === 0) {
        return state;
      }

      const num = String(`${numBefore}0`);
      return {
        ...state,
        num,
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
      return {
        ...state,
        num: 0,
        deputy: null,
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
      const symbol = action.operator;
      const {
        nums, calcultor, deputy, operator, unCountNum, operatored,
      } = state;
      const { acc, last, curr } = nums;
      const testInput = 'A+B*D*C';

      console.log(toPostfix(testInput));


      return {
        ...state,
      };
    }

    case PRESS_CALCULATE: {
      const {
        calcultor, num, deputy, operator,
      } = state;

      if (num === 0 && deputy === null) {
        return state;
      }

      let result;


      switch (operator) {
        case '+':
          result = calcultor + num;
          break;

        default:
          break;
      }

      return {
        ...state,
        num: result,
        deputy: null,
        operatored: true,
      };
    }

    default:
      return state;
  }
}
