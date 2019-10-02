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
  formula: [],
  deputy: null,
  operatored: false,
  operator: null,
  calculated: false,
};


export default function calcultor(state = initialState, action) {
  switch (action.type) {
    case GET_NUM: {
      const numInput = action.num;
      const {
        operatored, nums, calculated, formula,
      } = state;
      const { last, curr, multiDivi } = nums;

      const num = !operatored ? Number(curr + numInput) : Number(numInput);

      if (calculated) {
        return {
          ...state,
          nums: {
            ...nums,
            curr: num,
          },
          deputy: null,
          calcuator: false,
          operatored: false,
        };
      }

      return {
        ...state,
        nums: {
          ...nums,
          curr: num,
        },
        operatored: false,
        calcuator: false,
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
      const { nums } = state;

      return {
        ...state,
        nums: {
          ...nums,
          curr: 0,
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
        nums, deputy, operatored, calculated, formula,
      } = state;
      const { last, curr, multiDivi } = nums;

      if (calculated && operatored) {
        formula.push(curr);
        formula.push(symbol);
      } else if (operatored) {
        formula.pop();
        formula.push(symbol);
      } else {
        formula.push(curr);
        formula.push(symbol);
      }
      const calFormula = formula.concat();
      calFormula.pop();

      const postfix = toPostfix(calFormula);
      const value = postfixCal(postfix);
      const formulaString = formula.map((el) => el);

      return {
        ...state,
        nums: {
          ...nums,
          curr: value,
        },
        deputy: formulaString,
        operatored: true,
        operator: symbol,
        calculated: false,
      };
    }

    case PRESS_CALCULATE: {
      const {
        nums, deputy, operator, formula,
      } = state;
      const {
        curr,
      } = nums;

      if (deputy === null) {
        return state;
      }


      formula.push(curr);
      const postfix = toPostfix(formula);
      const value = postfixCal(postfix);
      const formulaString = formula.map((el) => el);


      return {
        ...state,
        nums: {
          ...nums,
          curr: value,
        },
        formula: [],
        deputy: formulaString,
        operatored: true,
        calculated: true,
      };
    }

    default:
      return state;
  }
}
