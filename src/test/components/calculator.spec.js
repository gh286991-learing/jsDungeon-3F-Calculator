import expect from 'expect';
import jest from 'jest-mock';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Calculator from '../../components/calculator/calculator';

configure({ adapter: new Adapter() });

function setup(calculator = {
  nums: {
    last: null,
    curr: 0,
    multiDivi: 0,
  },
  formula: [],
  deputy: [],
  operatored: false,
  operator: null,
  calculated: false,
}) {
  // 設定元件的action,buttons,值
  const actions = {
    getNum: jest.fn(),
    pressCalculate: jest.fn(),
    pressAC: jest.fn(),
    pressBack: jest.fn(),
    getOperator: jest.fn(),
  };

  const component = shallow(<Calculator
    num={calculator.nums.curr}
    deputy={calculator.deputy}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...actions}
  />);
  // 繪製元件，並把值和action傳入

  return {
    component,
    actions,
    monitor: component.find('.main_screen'),
    buttomCalculate: component.find('.eq_button'),
    GetNumber: component.find('button'),
  };
}


describe('components', () => {
  // 測試初始化的值是否正確‘
  describe('Calculator', () => {
    it('Inital state, monitor should display 0', () => {
      const { monitor } = setup();
      expect(monitor.text()).toMatch(/0/);
    });

    // 測試按鈕是否可以正確發起函數
    it('Calculate buttom should be action as pressCalculate', () => {
      const { monitor, buttomCalculate, actions } = setup();
      expect(buttomCalculate.text()).toMatch('=');
      buttomCalculate.simulate('click'); // simulate模擬按下按扭
      expect(actions.pressCalculate).toHaveBeenCalled();
      expect(monitor.text()).toMatch(/0/);
    });

    // 按鈕1
    it('GetNumber buttom 1 should be action', () => {
      // const components= setup().component
      const { GetNumber, actions } = setup();
      expect(GetNumber.at(0).text()).toMatch('1');
      GetNumber.at(0).simulate('click'); // simulate模擬按下按扭
      expect(actions.getNum).toHaveBeenCalled();
    });
  });
});
