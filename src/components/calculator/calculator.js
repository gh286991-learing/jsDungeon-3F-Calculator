import React from 'react';
import PropTypes from 'prop-types';
import './calculator.sass';


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    const nums = [...Array(10).keys()];
    nums.push([0], ['00'], ['.']);
    const operator = ['÷', 'x', '+', '-'];
    const {
      num, pressAC, pressBack, deputy, getOperator, pressCalculate, getNum,
    } = this.props;

    const { width } = window.screen;
    const { height } = window.screen;

    const style = {
      width: `${width}px`,
      height: `${height - height / 6}px`,
    };

    return (
      <div className="container" style={style}>
        <div className="calculator_border">
          <div className="screen">
            <div className="deputy_screen">
              {' '}
              {deputy}
            </div>
            <div className="main_screen">
              {' '}
              {num}
              {' '}
            </div>
          </div>
          <div className="button_area">
            <div className="num_area">

              <div className="number_container">

                {nums.map((value) => {
                  if (value === 0) {
                    return null;
                  }
                  return (
                    <button
                      key={value}
                      type="button"
                      className="text"
                      value={value}
                      onClick={(e) => getNum(e.currentTarget.value)}
                    >
                      {value}
                    </button>

                  );
                })}

              </div>
            </div>

            <div className="function_area">
              {operator.map((op) => (
                <button key={op} type="button" className="function_bottom" onClick={() => getOperator(op)}>
                  <div className="function_text">
                    {' '}
                    {op}
                    {' '}
                  </div>
                </button>
              ))}

            </div>

          </div>
          <div className="bottom_button">
            <button type="button" className="AC_button" onClick={pressAC}>
                AC
            </button>
            <button type="button" className="AC_button" onClick={pressBack}>
                ⌫
            </button>
            <button type="button" className="eq_button" onClick={pressCalculate}>
                =
            </button>
          </div>

        </div>
      </div>
    );
  }
}


Calculator.propTypes = {
  num: PropTypes.number.isRequired,
  deputy: PropTypes.arrayOf(
    PropTypes.number,
    PropTypes.string,
  ).isRequired,
  getNum: PropTypes.func.isRequired,
  pressAC: PropTypes.func.isRequired,
  pressBack: PropTypes.func.isRequired,
  getOperator: PropTypes.func.isRequired,
  pressCalculate: PropTypes.func.isRequired,
};

export default Calculator;
