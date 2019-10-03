import React from 'react';
import './calculator.sass';


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.valueClick = this.valueClick.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  valueClick = (e) => {
    const { getNum } = this.props;
    const values = e.currentTarget.value;
    getNum(values);
  }

  onClick =(e) => {
    const values = e.target.value;
    console.log('value', values);
  }

  render() {
    const nums = [...Array(10).keys()];
    nums.push([0], ['00'], ['.']);
    const operator = ['÷', 'x', '+', '-'];
    const {
      num, pressAC, pressBack, deputy, getPlus, pressCalculate,
    } = this.props;
    return (
      <div className="container">
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
                      onClick={this.valueClick}
                      value={value}
                    >
                      {value}
                    </button>

                  );
                })}

              </div>
            </div>

            <div className="function_area">
              {operator.map((op) => (
                <button type="button" className="function_bottom" onClick={() => getPlus(op)}>
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

export default Calculator;
