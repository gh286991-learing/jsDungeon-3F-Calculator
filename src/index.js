import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import CalculatorContainer from './containers/calculator-container';
import './styles.css';


const store = configureStore();

function App() {
  return (
    <div className="App">
      <CalculatorContainer />
    </div>
  );
}

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  rootElement
);
