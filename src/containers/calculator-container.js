import { connect } from 'react-redux';
import React from 'react';
import * as ActionCreators from '../actions/calcuator';
import Calculator from '../components/calculator/calculator';

class CalculatorContainer extends React.Component {
  render() {
    const {
      getNum, calcutor, getZero, getZeroZero, getPoint, pressAC, pressBack, getPlus, pressCalculate,
    } = this.props;
    const { nums, deputy } = calcutor;

    return (
      <div>
        <Calculator
          getNum={getNum}
          num={nums.curr}
          deputy={deputy}
          getZero={getZero}
          getZeroZero={getZeroZero}
          getPoint={getPoint}
          pressAC={pressAC}
          pressBack={pressBack}
          getPlus={getPlus}
          pressCalculate={pressCalculate}
        />
      </div>
    );
  }
}

export default connect(
  (state) => ({ calcutor: state.calcultor }),
  ActionCreators
)(CalculatorContainer);
