import { connect } from 'react-redux';
import React from 'react';
import * as ActionCreators from '../actions/calcuator';
import Calculator from '../components/calculator/calculator';

class CalculatorContainer extends React.Component {
  render() {
    const { get_Num, calcutor } = this.props;
    const { num } = calcutor;

    // const screenNum = screenNum + num

    return (
      <div>
        <Calculator get_Num={get_Num} num={num} />
      </div>
    );
  }
}

export default connect(
  (state) => ({ calcutor: state.calcultor }),
  ActionCreators
)(CalculatorContainer);
