import { connect } from 'react-redux';
import React from 'react';
import * as ActionCreators from '../actions/calcuator';
import Calculator from '../components/calculator/calculator';

class CalculatorContainer extends React.Component {
  render() {
    const {
      getNum, calcutor, getZero, getZeroZero, getPoint,
    } = this.props;
    const { num } = calcutor;

    // const screenNum = screenNum + num

    return (
      <div>
        <Calculator
          getNum={getNum}
          num={num}
          getZero={getZero}
          getZeroZero={getZeroZero}
          getPoint={getPoint}
        />
      </div>
    );
  }
}

export default connect(
  (state) => ({ calcutor: state.calcultor }),
  ActionCreators
)(CalculatorContainer);
