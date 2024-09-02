//using module.exports
const C = require('./test-module-1');

const calc1 = new C();

console.log(calc1.add(7, 10));

//using exports
const calc2 = require('./test-module-2');

const { add, multiply, divide} = calc2;

console.log(multiply(10, 7));

require('./test-module-3')();
require('./test-module-3')()
require('./test-module-3')()
