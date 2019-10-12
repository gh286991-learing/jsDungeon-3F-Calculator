import Stack from './stack';

const priority = (el) => {
  if (el === '+' || el === '-') {
    return 1;
  } if (el === 'x' || el === '÷') {
    return 2;
  } return 0;
};

export const toPostfix = function toPostfix(infix) {
  const stack = new Stack();
  const postfix = [];

  infix.forEach((el) => {
    if ('+-x÷'.indexOf(el) === -1) {
      postfix.push(el);
    } else {
      while (!stack.isEmpty()
       && priority(el) <= priority(stack.peek())
      ) {
        postfix.push(stack.pop());
      }

      stack.push(el);
    }
  });

  while (!stack.isEmpty()) {
    postfix.push(stack.pop());
  }
  return postfix;
};


export const postfixCal = function postfixCal(postfix) {
  const stack = new Stack();

  const formula = postfix;

  formula.forEach((el) => {
    if ('+-x÷'.indexOf(el) === -1) {
      stack.push(el);
    } else {
      const last = String(stack.pop());
      const penultimate = String(stack.pop());

      const lastDigits = (last.split('.')[1] || '').length;
      const penultimateDigits = (penultimate.split('.')[1] || '').length;
      const max = Math.max(lastDigits, penultimateDigits);
      // eslint-disable-next-line no-restricted-properties
      const baseNum = Math.pow(10, max);
      const num1 = last * baseNum;
      const num2 = penultimate * baseNum;
      let cal;


      switch (el) {
        case '+':
          cal = (num1 + num2) / baseNum;
          stack.push(cal);
          break;
        case '-':
          cal = (num2 - num1) / baseNum;
          stack.push(cal);
          break;
        case 'x':
          cal = (num1 * num2) / baseNum;
          stack.push(cal);
          break;
        case '÷':
          cal = (num2 / num1) / baseNum;
          stack.push(cal);
          break;

        default:
          break;
      }
    }
  });

  return Number(stack.toString());
};


export default {
  toPostfix,
  postfixCal,
};
