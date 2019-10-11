import expect from 'expect';
import calculator from '../../reducers';

describe('Calculattion functions', () => {
  describe('Base calculate', () => {
    it('Plus, 2+2+ , should be 4', () => {
      const state = calculator({
        calcultor: {
          nums: { curr: 2 },
          formula: [2, '+'],
          deputy: [2, '+'],
          operator: '+',
        },
      }, { type: 'GET_OPERATOR', operator: '+' });

      const { deputy, nums } = state.calcultor;
      const { curr } = nums;

      expect(curr).toBe(4);
      expect(deputy).toEqual([2, '+', 2, '+']);
    });

    it('Subtraction, 5-2- , should be 3', () => {
      const state = calculator({
        calcultor: {
          nums: { curr: 2 },
          formula: [5, '-'],
          deputy: [5, '-'],
          operator: '-',
        },
      }, { type: 'GET_OPERATOR', operator: '-' });

      const { deputy, nums } = state.calcultor;
      const { curr } = nums;

      expect(curr).toBe(3);
      expect(deputy).toEqual([5, '-', 2, '-']);
    });

    it('Multiplication 2x5 , should be 10', () => {
      const state = calculator({
        calcultor: {
          nums: { curr: 5 },
          formula: [2, 'x'],
          deputy: [2, 'x'],
          operator: 'x',
        },
      }, { type: 'GET_OPERATOR', operator: 'x' });

      const { deputy, nums } = state.calcultor;
      const { curr } = nums;

      expect(curr).toBe(10);
      expect(deputy).toEqual([2, 'x', 5, 'x']);
    });

    it('division 10 / 5 , should be 2', () => {
      const state = calculator({
        calcultor: {
          nums: { curr: 5 },
          formula: [10, '÷'],
          deputy: [10, '÷'],
          operator: '÷',
        },
      }, { type: 'GET_OPERATOR', operator: '÷' });

      const { deputy, nums } = state.calcultor;
      const { curr } = nums;

      expect(curr).toBe(2);
      expect(deputy).toEqual([10, '÷', 5, '÷']);
    });
  });
});

describe('Mix calcultor', () => {
  describe('1+2x3, it should be muti first than plus', () => {
    let state;
    it('Press 1+2, and then press x , monitor should be 2 (2 will be multiplied )', () => {
      state = calculator({
        calcultor: {
          nums: { curr: 2 },
          formula: [1, '+'],
          deputy: [1, '+'],
          operator: '+',
        },
      }, { type: 'GET_OPERATOR', operator: 'x' });

      const { deputy, nums } = state.calcultor;
      const { curr } = nums;

      expect(curr).toBe(2); // (2 will be multiplied )
      expect(deputy).toEqual([1, '+', 2, 'x']);
    });

    it('press 3 and press calculator , it should be 7', () => {
      // press 3
      state = calculator({
        ...state,
      }, { type: 'GET_NUM', num: '3' });

      // press calculator
      state = calculator({
        ...state,
      }, { type: 'PRESS_CALCULATE' });


      const { deputy, nums } = state.calcultor;
      const { curr } = nums;

      expect(curr).toBe(7); // (1+2x3 = 7 )
      expect(deputy).toEqual([1, '+', 2, 'x', 3]);
    });
  });

  describe('Change the operator , before get number', () => {
    let state;
    it('1+2+ , it should be 3', () => {
      state = calculator({
        calcultor: {
          nums: { curr: 2 },
          formula: [1, '+'],
          deputy: [1, '+'],
          operator: '+',
        },
      }, { type: 'GET_OPERATOR', operator: '+' });

      const { deputy, nums } = state.calcultor;
      const { curr } = nums;

      expect(curr).toBe(3); // (2 will be multiplied )
      expect(deputy).toEqual([1, '+', 2, '+']);
    });

    it('change opreator to x , monitor should be 2', () => {
      state = calculator({
        ...state,
      }, { type: 'GET_OPERATOR', operator: 'x' });

      const { deputy, nums } = state.calcultor;
      const { curr } = nums;

      expect(curr).toBe(2); // (2 will be multiplied )
      expect(deputy).toEqual([1, '+', 2, 'x']);
    });


    it('press number and calculate, monitor should be 7', () => {
      state = calculator({
        ...state,
      }, { type: 'GET_NUM', num: '3' });

      state = calculator({
        ...state,
      }, { type: 'PRESS_CALCULATE' });

      const { deputy, nums } = state.calcultor;
      const { curr } = nums;

      expect(curr).toBe(7);
      expect(deputy).toEqual([1, '+', 2, 'x', 3]);
    });
  });
});
