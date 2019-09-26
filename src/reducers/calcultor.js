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
  deputy: null,
  operatored: false
};


export default function calcultor(state = initialState, action) {
  switch (action.type) {
    case GET_NUM: {
      const numGet = action.num;
      const numBefore = state.num;
      const operatored = state.operatored

      const deputyBefore = String(state.deputy);

      const num = !operatored ? Number(numBefore + numGet) : numGet

      const deputy = ((deputyBefore === 0 ? numBefore : deputyBefore) + numGet).replace(/\b(0)/g, '');


      return {
        ...state,
        num,
        operatored : false
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
      const num = String(state.num);
      const deputyBefore = state.deputy
      const operator = '+'

      if( deputyBefore === null ){
        return{
          ...state,
        num: num,
        deputy : `${num}${operator}`,
        operatored : true
        }
      }

      const deputy = `${deputyBefore}${num}${operator}`;

      return {
        ...state,
        num: num,
        deputy,
        operatored : true
      };
    }

    case PRESS_CALCULATE: {
      const deputy = String(state.deputy);
      const operator = state.operator
      const num = String(state.num)

      const result = eval(deputy + operator+num);

      return {
        ...state,
        num: result,
        deputy: null,
      };
    }

    default:
      return state;
  }
}
