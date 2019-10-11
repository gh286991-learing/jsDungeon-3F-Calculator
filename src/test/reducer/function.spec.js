import expect from 'expect';
import calculator from '../../reducers';

describe('Back function', () => {
  describe('Back number', () => {
    it('99 press back, it should be 9', () => {
      const state = calculator({
        calcultor: {
          nums: { curr: 99 },
        },
      }, { type: 'PRESS_BACK' });

      const mintor = state.calcultor.nums.curr;
      expect(mintor).toBe(9);
    });

    it('Monitor is 0 , it should be 0', () => {
      const state = calculator({
        calcultor: {
          nums: { curr: 0 },
        },
      }, { type: 'PRESS_BACK' });

      const mintor = state.calcultor.nums.curr;
      expect(mintor).toBe(0);
    });
  });
});

describe('AC function', () => {
  describe('Clear both main & depty screen', () => {
    it('main 2 , deputy 1+1, it should be 0 , null', () => {
      const state = calculator({
        calcultor: {
          nums: { curr: 2 }, formula: [1, '+', 1], deputy: [1, '+', 1],
        },
      }, { type: 'PRESS_AC' });

      expect(state).toEqual({
        calcultor: {
          nums: { curr: 0 }, formula: [], deputy: [],
        },
      });
    });

    it('Monitor is 0, shold return 0', () => {
      const state = calculator({
        calcultor: {
          nums: { curr: 0 }, formula: [], deputy: [],
        },
      }, { type: 'PRESS_AC' });

      expect(state).toEqual({
        calcultor: {
          nums: { curr: 0 }, formula: [], deputy: [],
        },
      });
    });
  });
});

describe('Calculate bottom', () => {
  describe('Inital state press calculate', () => {
    let state;
    it('0 , press calculate should happen nothing', () => {
      state = calculator({
        calcultor: {
          nums: { curr: 0 }, formula: [], deputy: [],
        },
      }, { type: 'PRESS_CALCULATE' });

      const monitor = state.calcultor.nums.curr;
      const depty = state.calcultor.deputy;
      expect(monitor).toBe(0);
      expect(depty).toEqual([]);
    });

    it('Press calculate 3 times should happen nothing', () => {
      state = calculator({
        ...state,
      }, { type: 'PRESS_CALCULATE' });

      state = calculator({
        ...state,
      }, { type: 'PRESS_CALCULATE' });

      const monitor = state.calcultor.nums.curr;
      const depty = state.calcultor.deputy;
      expect(monitor).toBe(0);
      expect(depty).toEqual([]);
    });
  });
  describe('Get the result for formular', () => {
    it('formular is 1+1, it should be return 2', () => {
      const state = calculator({
        calcultor: {
          nums: { last: null, curr: 1 }, formula: [1, '+'], deputy: [1, '+'],
        },
      }, { type: 'PRESS_CALCULATE' });

      expect(state).toEqual({
        calcultor: {
          nums: { last: 1, curr: 2 },
          formula: [1, '+', 1],
          deputy: [1, '+', 1],
          calculated: true,
          operatored: true,
        },
      });
    });
  });
  describe('按等於後在繼續運算不會影響', () => {
    let state;
    it('5+6 = , it should be 11', () => {
      state = calculator({
        calcultor: {
          nums: { last: null, curr: 6 }, formula: [5, '+'], deputy: [5, '+'],
        },
      }, { type: 'PRESS_CALCULATE' });

      expect(state).toEqual({
        calcultor: {
          nums: { last: 6, curr: 11 },
          formula: [5, '+', 6],
          deputy: [5, '+', 6],
          calculated: true,
          operatored: true,
        },
      });
    });

    it('Get number 2, it should be 2', () => {
      state = calculator({
        ...state,
      }, { type: 'GET_NUM', num: '2' });
      const monitor = state.calcultor.nums.curr;
      const depty = state.calcultor.deputy;
      expect(monitor).toBe(2);
      expect(depty).toEqual([]);
    });

    it('Get plus + & Get number 3', () => {
      // Get plus
      state = calculator({
        ...state,
      }, { type: 'GET_OPERATOR', operator: '+' });

      //   Get number 3
      state = calculator({
        ...state,
      }, { type: 'GET_NUM', num: '3' });

      const { deputy, nums } = state.calcultor;
      const { curr } = nums;

      expect(curr).toBe(3);
      expect(deputy).toEqual([2, '+']);
    });

    it('Press calculator should be 5', () => {
      state = calculator({
        ...state,
      }, { type: 'PRESS_CALCULATE' });

      const { deputy, nums } = state.calcultor;
      const { curr } = nums;

      expect(curr).toBe(5);
      expect(deputy).toEqual([2, '+', 3]);
    });
  });
});

describe('It can be accumulate', () => {
  describe('2x2xxx, monitor should be accumlate multiply answer', () => {
    let state;
    it('2x2 , monitor should be 4', () => {
      state = calculator({
        calcultor: {
          nums: { curr: 2 },
          formula: [2, 'x'],
          deputy: [2, 'x'],
          operator: 'x',
        },
      }, { type: 'PRESS_CALCULATE' });

      const { deputy, nums } = state.calcultor;
      const { curr } = nums;

      expect(curr).toBe(4);
      expect(deputy).toEqual([2, 'x', 2]);
    });

    it('Press calculate 2 times , should be 8 ', () => {
      state = calculator({
        ...state,
      }, { type: 'PRESS_CALCULATE' });

      const { deputy, nums } = state.calcultor;
      const { curr } = nums;

      expect(curr).toBe(8);
      expect(deputy).toEqual([2, 'x', 2, 'x', 2]);
    });

    it('Press calculate 3 times , should be 16', () => {
      state = calculator({
        ...state,
      }, { type: 'PRESS_CALCULATE' });

      const { deputy, nums } = state.calcultor;
      const { curr } = nums;

      expect(curr).toBe(16);
      expect(deputy).toEqual([2, 'x', 2, 'x', 2, 'x', 2]);
    });
  });
});
