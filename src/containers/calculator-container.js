import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import * as ActionCreators from '../actions/calcuator';
import Calculator from '../components/calculator/calculator';


class CalculatorContainer extends React.Component {
  render() {
    const {
      getNum, calcutor, pressAC, pressBack, getOperator, pressCalculate,
    } = this.props;
    const { nums, deputy } = calcutor;

    return (
      <div>
        <Calculator
          getNum={getNum}
          num={nums.curr}
          deputy={deputy}
          pressAC={pressAC}
          pressBack={pressBack}
          getOperator={getOperator}
          pressCalculate={pressCalculate}
        />
      </div>
    );
  }
}

CalculatorContainer.propTypes = {
  calcutor: PropTypes.shape({
    nums: PropTypes.object,
    deputy: PropTypes.array,
  }).isRequired,
  getNum: PropTypes.func.isRequired,
  pressAC: PropTypes.func.isRequired,
  pressBack: PropTypes.func.isRequired,
  getOperator: PropTypes.func.isRequired,
  pressCalculate: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({ calcutor: state.calcultor }),
  ActionCreators
)(CalculatorContainer);
