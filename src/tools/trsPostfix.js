import Stack from './stack';

const priority = (el) => {
  if (el === '+' || el === '-') {
    return 1;
  } if (el === '*' || el === '/') {
    return 2;
  } return 0;
};


export default function toPostfix(infix) {
  const formula = infix.split('');
  const stack = new Stack();
  const postfix = [];


  formula.forEach((el) => {
    if ('+-*/'.indexOf(el) === -1) {
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
  return postfix;
}


// const input = 'A+B*D*C'

// const test = toPostfix(input)

// console.log('result ' , test)
