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
  nums: {
    acc : 0,
    last : 0,
    curr:0,
  },

  deputy: null,
  operatored: false,
  operator: null,
  calcuator: {
    acc : 0 , 
    brackets:0
  }
};


export default function calcultor(state = initialState, action) {
  switch (action.type) {
    case GET_NUM: {
      const numInput = action.num;
      const { operatored , nums } = state;
      const { acc , curr, last}= nums

      const num = !operatored ? Number(curr + numInput) : Number(numInput);

      return {
        ...state,
        nums:{
         ...nums,
          curr : num,
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
      const { nums ,calcultor ,deputy ,operator, unCountNum,operatored } = state;
      const {acc , last , curr} = nums

      let result
      let formula

       if(operatored === true){

        formula = deputy.substring(0,deputy.length-1) + symbol

        return {
          ...state,
          deputy :formula,
          operator : symbol
        }
       }



      if(symbol === '+'){

        formula = !deputy? `${curr}${symbol}` : `${deputy}${curr}${symbol}`

        if(operator === 'x'){
          const remain = acc - last

          result =  acc * curr 

          return {
            ...state,
            nums:{
              ...nums,
              acc :result,
              curr : result,
              last: curr
            },
            deputy :formula,
            operator: symbol,
            operatored: true,
          }
          
        }else{
          result = acc + curr
        }

      }
      else if(symbol === 'x'){
        formula = !deputy? `${curr}${symbol}` : `${deputy}${curr}${symbol}`
        if(operator === '+'){ 
          result = acc + curr
        }else{
          result = last === 0 ? curr : acc * curr
        }
       
        
      }

      return {
        ...state,
        nums:{
          ...nums,
          acc :result,
          curr : result,
          last : acc
        },
        deputy :formula,
        operatored: true,
        operator: symbol,
      }


      // if(operatored === true){

      //   const formula = deputy.substring(0,deputy.length-1) + symbol

      //   if(symbol === 'x'){
      //     // const beforeCalcutor = calcultor-temp
    
      //     return {
      //       ...state,
      //       num : tempMuti,
      //       deputy :formula,
      //       operatored: true,
      //       calcultor: tempMuti,
      //       operator: symbol,
      //       unCountNum,
      //     }

      //   }else{
      //     return {
      //       ...state,
      //       num,
      //       deputy :formula,
      //       operatored: true,
      //       calcultor,
      //       operator: symbol,
      //       unCountNum 
      //     }
      //   }


      // }

      
      // if(symbol === '+'){

      //   let result

      //   if(operator === 'x'){
      //     result = num * calcultor + unCountNum
      //   }else{
      //     result = num + calcultor
      //   }

      //   const formula = !deputy? `${num}${symbol}` : `${deputy}${num}${symbol}`
   

      //   return {
      //     ...state,
      //     num: result,
      //     deputy :formula,
      //     operatored: true,
      //     calcultor: result,
      //     operator: symbol,
      //     unCountNum : null
      //   }
      // }

      // if(symbol === 'x'){

      //   const formula = !deputy? `${num}${symbol}` : `${deputy}${num}${symbol}`
        


      //   if(operator ==='+'){

      //     return {
      //       ...state,
      //       num: num,
      //       deputy :formula,
      //       operatored: true,
      //       calcultor: num,
      //       operator: symbol,
      //       unCountNum : calcultor
      //     }
      //   }
      //   else{
          
      //     const result = num *  (calcultor === 0? 1:calcultor)
      //     return {
      //       ...state,
      //       num: result,
      //       deputy :formula,
      //       operatored: true,
      //       calcultor: result,
      //       operator: symbol,
      //       unCountNum,
      //       tempMuti : result
      //     }
      //   }

      // }

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
