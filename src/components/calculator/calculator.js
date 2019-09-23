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
    const values = e.currentTarget.value;
    console.log('value', values);
  }

  onClick =(e) => {
    const values = e.target.value;
    console.log('value', values);
  }

  render() {
    const num = [...Array(10).keys()];
    console.log(num);
    return (
      <div className="container">
        <div className="calculator_border">
          <div className="screen" >
            <div className="deputy_screen" > 99+189 =789</div>
            <div className="main_screen" > 3343432</div>
          </div>
          <div className="button_area">
            <div className="num_area">

              <div className="number_container">

                {num.map((value) => {
                  if (value === 0) {
                    return null;
                  }
                  return (
                    <div key={value} className="number_bottom">
                      <button
                        type="button"
                        className="text"
                        onClick={this.valueClick}
                        value={value}
                      >{value}
                      </button>
                    </div>
                  );
                })}

                <div className="number_bottom">
                  <button 
                    type="button"
                    className="text">
                      0
                  </button>
                </div>
                <div className="number_bottom">
                <button 
                    type="button"
                    className="text">
                      00
                  </button>
                </div>
                <div className="number_bottom">
                <button 
                    type="button"
                    className="text">
                      .
                  </button>
                </div>

              </div>
   

            </div>
            <div className="function_area">
              <button className="function_bottom">
                <div
                  className="function_text"
                  onClick={this.onClick} > ÷ </div>
              </button>
              <button className="function_bottom">
                <div className="function_text"> x </div>
              </button>
              <button className="function_bottom">
                <div className="function_text"> + </div>
              </button>
              <button className="function_bottom">
                <div className="function_text"> - </div>
              </button>
            </div>
          </div>
          <div className="bottom_button">
              <button className="AC_button">
                AC
              </button>
              <button className="AC_button">
                ⌫
              </button>
              <button className="eq_button">
                =
              </button>
          </div>

        </div>
      </div>
    );
  }
}

export default Calculator;
