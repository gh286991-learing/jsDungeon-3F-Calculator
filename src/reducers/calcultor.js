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

import { toPostfix, postfixCal } from '../tools/trsPostfix';

const initialState = {
  nums: {
    last: 0,
    curr: 0,
    multiDivi: 0,
  },
  deputy: null,
  operatored: false,
  operator: null,
  calculated: false,
};


export default function calcultor(state = initialState, action) {
  switch (action.type) {
    case GET_NUM: {
      const numInput = action.num;
      const { operatored, nums } = state;
      const { last, curr, multiDivi } = nums;

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
      const { nums} = state

      return {
        ...state,
        nums: {
          ... nums,
          curr : 0
        },
        deputy: null,
      };
    }

    case PRESS_BACK: {
      const { nums } = state;
      const { curr } = nums;
      const numBefore = String(curr);
      const numLength = numBefore.length;
      const numString = numLength === 1 ? 0 : numBefore.substring(0, numLength - 1);
      const num = Number(numString);

      return {
        ...state,
        nums: {
          ...nums,
          curr: num,
        },
      };
    }

    case GET_PLUS: {
      const symbol = action.operator;
      const {
        nums, deputy, operatored, calculated,
      } = state;
      const { last, curr, multiDivi } = nums;

      const screen = (deputy, operatored) => {
        if (!deputy) {
          return `${curr}${symbol}`;
        } if (calculated) {
          return `${deputy}${symbol}`;
        }
        if (operatored) {
          return `${deputy.substring(0, deputy.length - 1)}${symbol}`;
        } return `${deputy}${curr}${symbol}`;
      };

      const deputyScreen = screen(deputy, operatored);

      const formula = deputyScreen.substring(0, deputyScreen.length - 1);

      const postfix = toPostfix(formula);
      const value = postfixCal(postfix);


      return {
        ...state,
        nums: {
          ...nums,
          curr: value,
        },
        deputy: deputyScreen,
        operatored: true,
        operator: symbol,
        calculated: false,
      };
    }

    case PRESS_CALCULATE: {
      const {
        nums, deputy, operator,
      } = state;
      const {
        curr,
      } = nums;

      if ( deputy === null) {
        return state;
      }

      const deputyScreen =  `${deputy.substring(0, deputy.length - 1)}${operator}${curr}`


      const postfix = toPostfix(deputyScreen);
      const value = postfixCal(postfix);


      return {
        ...state,
        nums: {
          ...nums,
          curr: value,
        },
        deputy: deputyScreen,
        operatored: true,
        calculated: true,
      };
    }

    default:
      return state;
  }
}
