Array.prototype.getLast = function() {
    return this[this.length - 1];
};

Array.prototype.isEmpty = function() {
    return this.length == 0;
};    //給array賦予新的性質

function priority(c) {
    return c === '+' || c === '-' ? 1 : c === '*' || c === '/' ? 2 : 0;
}

function toPostfix(infix) {

    var expr =  infix.split('')  // 分割
    // console.log('expr 輸入的題目', expr)
    var stack = [];
    var output = [];

    expr.forEach(function(c) {

        if('+-*/'.indexOf(c) !== -1) { //有運算符號的時候

            while(!stack.isEmpty() && 
                   priority(stack.getLast()) >= priority(c)) 
                   //當stack不是空然後最後一個的stack中優先度 又大於現在的時候
            {
                output.push(stack.pop()); //直接把現在stack推到outPut 並移除
            }  // 執行到優先度低

            stack.push(c); //不然就一直加上去stack
        }

        else { output.push(c); } //數字的話直接push到output

        console.log('       ' , c, '         ' ,stack , '    ' ,output)
    });

    
    while(!stack.isEmpty()) { output.push(stack.pop()); }  //最後一個把他推上去
    
    return output.join('')
    //只是合併字串而已
}

const infix = "A*B*C"

console.log('Input : ' ,infix )
console.log( 'Current  symbol ' , ' operator stack ' , ' output (postfix)' )


console.log(toPostfix(infix));


Input :  A*B*C
Current  symbol   operator stack   output (postfix)
        A           []              [ 'A' ]
        *           [ '*' ]         [ 'A' ]
        B           [ '*' ]         [ 'A', 'B' ]
        *           [ '*' ]         [ 'A', 'B', '*' ]
        C           [ '*' ]         [ 'A', 'B', '*', 'C' ]
AB*C*