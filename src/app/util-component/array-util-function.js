var hello = {
  hello: 'world',
  foo: 'bar'
};
var qaz = {
  hello: 'stevie',
  foo: 'baz'
}


var myArray = [];
myArray.push(hello,qaz);

pos = myArray.map(element =>  element.hello).indexOf('stevie');
console.log(pos);

// remove element in position
myArray.splice(pos, 1);


var toto = {
  hello: 'toto_hello',
  foo: 'toto_baz'
}
// replace element in position
myArray.splice(pos, 1, toto);
console.log(myArray);
