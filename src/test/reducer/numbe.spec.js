import expect from 'expect';
import calculator from '../../reducers';

describe('Press number should be show in the mintor', () => {
  describe('Input 3 should be 3', () => {
    it('Press unknow should return state', () => {
      const state = calculator({
        calcultor: {
          nums: { curr: 0 },
        },
      }, { type: 'unknow', num: '3' });

      const { curr } = state.calcultor.nums;

      expect(curr).toBe(0);
    });

    it('Press number 3 ', () => {
      const state = calculator({
        calcultor: {
          nums: { curr: 0 },
        },
      }, { type: 'GET_NUM', num: '3' });

      const { curr } = state.calcultor.nums;

      expect(curr).toBe(3);
    });
  });

  describe('Input 3 , 6 should be 36', () => {
    it('Press number 6 in mintor is 3 ', () => {
      const state = calculator({
        calcultor: {
          nums: {
            curr: 3,
          },
        },
      }, { type: 'GET_NUM', num: '6' });

      const mintor = state.calcultor.nums.curr;
      expect(mintor).toBe(36);
    });
  });
});


describe('0 & 00 function', () => {
  describe('When monitor is 0 press 0 or 00', () => {
    it('Press 0 buttom, monitor should be 0', () => {
      let state;
      state = calculator({
        calcultor: {
          nums: { curr: 0 },
        },
      }, { type: 'GET_NUM', num: '0' });

      const mintor = state.calcultor.nums.curr;
      expect(mintor).toBe(0);
    });

    it('Press 00 buttom, monitor should be 0', () => {
      let state;
      state = calculator({
        calcultor: {
          nums: { curr: 0 },
        },
      }, { type: 'GET_NUM', num: '00' });

      const mintor = state.calcultor.nums.curr;
      expect(mintor).toBe(0);
    });
  });
  describe('when mointor has number , press 0 & 00', () => {
    it('Input unknow, should be return state', () => {
      let state;
      state = calculator({
        calcultor: {
          nums: { curr: 0 },
        },
      }, { type: 'unknow', num: '122' });

      const mintor = state.calcultor.nums.curr;
      expect(mintor).toBe(0);
    });
    it('Monitor is 2 , press 0 buttom, should be 20', () => {
      let state;
      state = calculator({
        calcultor: {
          nums: { curr: 2 },
        },
      }, { type: 'GET_NUM', num: '0' });

      const mintor = state.calcultor.nums.curr;
      expect(mintor).toBe(20);
    });

    it('Monitor is 2 , press 00 buttom, should be 200', () => {
      let state;
      state = calculator({
        calcultor: {
          nums: { curr: 2 },
        },
      }, { type: 'GET_NUM', num: '00' });

      const mintor = state.calcultor.nums.curr;
      expect(mintor).toBe(200);
    });
  });
});
