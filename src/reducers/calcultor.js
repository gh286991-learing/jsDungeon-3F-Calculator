import {
  GET_NUM,
  PRESS_AC,
  PRESS_BACK,
  GET_PLUS,
  PRESS_CALCULATE,
} from '../actions/calcuator';

import { toPostfix, postfixCal } from '../tools/trsPostfix';

const initialState = {
  nums: {
    last: null,
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

      let num;
      if (numInput == '.' || String(curr).indexOf('.') > 0) {
        num = !operatored ? String(curr) + String(numInput) : Number(numInput);
      } else {
        num = !operatored ? Number(curr + numInput) : Number(numInput);
      }


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

    case PRESS_AC: {
      const { nums } = state;

      return {
        ...state,
        nums: {
          ...nums,
          curr: 0,
        },
        deputy: null,
        formula: [],
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

      const num = Number(curr);

      if (last) {
        formula.length = 0;
      }

      if (calculated && operatored) {
        formula.push(num);
        formula.push(symbol);
      } else if (operatored) {
        formula.pop();
        formula.push(symbol);
      } else {
        formula.push(num);
        formula.push(symbol);
      }


      const calFormula = formula.concat();
      calFormula.pop();

      let mutiForm = [];

      if (symbol === 'x' || symbol === '÷' && calFormula.length != 1) {
        const lastOP = calFormula.lastIndexOf('+') > 0 ? calFormula.lastIndexOf('+') : calFormula.lastIndexOf('-');
        mutiForm = calFormula.concat();
        mutiForm.splice(0, lastOP + 1);
      }

      const postfix = toPostfix(calFormula);
      const result = postfixCal(postfix);

      const mutiNum = postfixCal(toPostfix(mutiForm));
      const value = mutiNum === 0 ? result : mutiNum;
      const formulaString = formula.map((el) => el);

      return {
        ...state,
        nums: {
          ...nums,
          curr: value,
          last: null,
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
        curr, last,
      } = nums;

      if (deputy === null) {
        return state;
      }


      let newformula;
      if (last) {
        formula.push(operator, last);
        newformula = formula;
      } else {
        formula.push(curr);
        newformula = formula;
      }

      const postfix = toPostfix(formula);
      const value = postfixCal(postfix);


      const formulaString = formula.map((el) => el);

      const lastNum = !last ? curr : last;

      return {
        ...state,
        nums: {
          ...nums,
          curr: value,
          last: lastNum,
        },
        formula: newformula,
        deputy: formulaString,
        operatored: true,
        calculated: true,
      };
    }

    default:
      return state;
  }
}
