import expect from 'expect';
import reducers from '../../reducers';

describe('Plus function test', () => {
  it(' 0 >> 3 + 3 = 6', () => {
    let state;

    state = reducers({
      calcultor: {
        num: 0,
      },
    }, { type: 'GET_NUM', num: '3' }); // 0 >>>> 3

    expect(state.calcultor.num).toBe(3);

    state = reducers({
      calcultor: {
        num: 3,
      },
    }, { type: 'GET_PLUS' });

    expect(state.calcultor.operator).toBe('+'); // 3 +

    state = reducers({
      calcultor: {
        num: 3,
      },
    }, { type: 'GET_NUM', num: '3' }); // 3 + 3


    state = reducers({
      calcultor: {
        num: 3, operator: '+', calcultor: 3,
      },
    }, { type: 'PRESS_CALCULATE' }); // 3 + 3 =

    expect(state.calcultor.num).toBe(6); // 3 + 3 = 6
  });
});
