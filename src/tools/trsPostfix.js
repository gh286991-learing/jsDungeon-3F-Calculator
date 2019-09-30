import Stack from './stack';

const priority = (el) => {
  if (el === '+' || el === '-') {
    return 1;
  } if (el === 'x' || el === '/') {
    return 2;
  } return 0;
};

export const toPostfix = function toPostfix(infix) {
  const formula = infix.split('');
  const stack = new Stack();
  const postfix = [];

  formula.forEach((el) => {
    if ('+-x/'.indexOf(el) === -1) {
      postfix.push(el);
    } else {
      const lastPriority = priority(stack.peek());
      const elPriority = priority(el);

      if (!stack.isEmpty() && elPriority <= lastPriority) {
        postfix.push(stack.pop());
      }

      stack.push(el);
    }
  });

  while (!stack.isEmpty()) {
    postfix.push(stack.pop());
  }
  console.log('postfix ', postfix);
  return postfix;
};


export const postfixCal = function postfixCal(postfix) {
  const stack = new Stack();

  const formula = postfix;

  formula.forEach((el) => {
    if ('+-x/'.indexOf(el) === -1) {
      stack.push(el);
    } else {
      const last = Number(stack.pop());
      const penultimate = Number(stack.pop());
      let cal;

      switch (el) {
        case '+':
          cal = last + penultimate;
          stack.push(cal);
          break;
        case 'x':
          cal = last * penultimate;
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
