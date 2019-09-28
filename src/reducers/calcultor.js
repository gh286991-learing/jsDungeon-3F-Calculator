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
  operatored: false,
  operator: null,
  calcultor: 0,
  unCountNum : null
};


export default function calcultor(state = initialState, action) {
  switch (action.type) {
    case GET_NUM: {
      const numGet = action.num;
      const numBefore = state.num;
      const { operatored } = state;

      const num = !operatored ? Number(numBefore + numGet) : Number(numGet);

      return {
        ...state,
        num,
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
      const { num ,calcultor ,deputy ,operator, unCountNum} = state;
      

      if (deputy === null) {
        return {
          ...state,
          num,
          deputy: `${num}`,
          operatored: true,
          calcultor: num,
          operator : symbol,
        };
      }

      let result
      let deputyScreen
      let remain 
      
      if (symbol === '+'){

        if(operator === 'x'){
          deputyScreen = `${deputy}${operator}${num}`;
          result = Number(calcultor) * Number(num) + Number(unCountNum);
          remain = null
        }
        else if(unCountNum != null ){ 
          result = Number(calcultor) +  Number(unCountNum);
          deputyScreen = `${deputy}`;
          remain = null

        }
        else{
          result = Number(calcultor) + Number(num);
          deputyScreen = `${deputy}${symbol}${num}`;
        }
        
        
      }
      else if(symbol ==='-'){
        result = Number(calcultor) - Number(num);
        deputyScreen = `${deputy}${symbol}${num}`;
      }
      else if(symbol ==='x'){
      // 2+ (5 * 6) + >>> 37
        if(operator === '+' ||operator === '-' ){
          deputyScreen = `${deputy}${operator}${num}`;
          result = Number(num);
          remain = calcultor
          // calcultor
          
        }else{
          deputyScreen = `${deputy}${operator}${num}`;
          result = Number(calcultor) * Number(num);
          remain = unCountNum
        }

      }
      else if(symbol ==='÷'){
        result = Number(calcultor) / Number(num);
      }

      
      
      return {
        ...state,
        num: result,
        deputy :deputyScreen,
        operatored: true,
        calcultor: result,
        operator: symbol,
        unCountNum : remain
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
