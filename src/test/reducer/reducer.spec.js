import expect from 'expect';
import calcultor from '../../reducers';

describe('Clacultor function test', () => {
  describe('Get number test', () => {
    let state;

    it('Get number action undified should return inital state', () => {
      state = calcultor({
        calcultor: {
          num: 10,
        },
      }, { type: 'undefind', num: 12 });

      const { num } = state.calcultor;

      expect(num).toBe(10);
    });

    it('Get number 0 >> 5 should return 5', () => {
      state = calcultor({
        calcultor: {
          num: 0,
        },
      }, { type: 'GET_NUM', num: '5' });

      const { num } = state.calcultor;

      expect(num).toBe(5);
    });


    it('Screen number is 4 and get number 5,should return 45', () => {
      state = calcultor({
        calcultor: {
          num: 4,
        },
      }, { type: 'GET_NUM', num: '5' });

      const { num } = state.calcultor;

      expect(num).toBe(45);

      console.log(state);
    });
  });

  describe('complex test for press 33 + 33 + , screen should be 66', () => {
    let state;
    it('Get number 0 => 3', () => {
      state = calcultor({
        calcultor: {
          num: 0,
        },
      }, { type: 'GET_NUM', num: '3' }); // 0 >>>> 3

      expect(state.calcultor.num).toBe(3);
    });

    it('Get number 3 => 33', () => {
      state = calcultor({
        calcultor: {
          num: 3,
        },
      }, { type: 'GET_NUM', num: '3' }); // 0 >>>> 33

      expect(state.calcultor.num).toBe(33);
    });

    it('Press plus , main & depty screen should show 33', () => {
      state = calcultor({
        calcultor: {
          num: 33, deputy: null,
        },
      }, { type: 'GET_PLUS' });

      const { num, deputy } = state.calcultor;

      expect(num).toBe(33);
      expect(deputy).toBe('33');
    });

    it('Press plus again, main should be 66 , depty should be 33+33', () => {
      state = calcultor({
        calcultor: {
          num: 33, deputy: '33', operator: '+', calcultor: 33,
        },
      }, { type: 'GET_PLUS' });

      const { num, deputy } = state.calcultor;

      expect(num).toBe(66);
      expect(deputy).toBe('33+33');
    });
  });
});

