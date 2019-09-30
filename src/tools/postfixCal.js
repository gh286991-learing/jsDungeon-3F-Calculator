// import Stack from './stack';

const items = [];

class Stack {
    constructor() {
      this[items] = [];
    }
  
    push(element) {
      this[items].push(element);
    }
  
    pop() {
      return this[items].pop();
    }
  
    peek() {
      return this[items][this[items].length - 1];
    }
  
    isEmpty() {
      return this[items].length === 0;
    }
  
    toString() {
      return this[items].toString();
    }
  }
  


const postfixCal= (postfix) =>{
    const stack = new Stack()
    const formula = postfix.split('');

    formula.forEach( el =>{
        if('+-*/'.indexOf(el) === -1){
            stack.push(el)
        } else {
            const last = Number(stack.pop())
            const penultimate = Number(stack.pop())
            let cal

            switch (el) {
                case '+':
                    cal = last + penultimate
                    stack.push(cal)
                    break;
                case '*':
                        cal = last * penultimate
                        stack.push(cal)
                        break;
            
                default:
                    break;
            }
        }
        
    })


    return  Number(stack.toString())
}




const input = '123*4*+56*+'
const ans = postfixCal(input)

console.log('ans ' , ans)