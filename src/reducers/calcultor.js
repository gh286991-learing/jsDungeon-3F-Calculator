import {
  GET_NUM,
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
    default:
      return state;
  }
}
