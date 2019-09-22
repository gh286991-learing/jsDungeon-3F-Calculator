import { connect } from 'react-redux';
import React from 'react';
import * as ActionCreators from '../actions';
import Calculator from '../components/calculator/calculator';

class CalculatorContainer extends React.Component {
  render() {
    return (
      <div>
        <Calculator />
      </div>
    );
  }
}

export default connect(
  (state) => ({ state }),
  ActionCreators
)(CalculatorContainer);
