// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
/*
var stringifiableObjects = [
  9,
  null,
  true,
  false,
  'Hello world',
  [],
  [8],
  ['hi'],
  [8, 'hi'],
  [1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999],
  [8, [[], 3, 4]],
  [[[['foo']]]],
  {},
  {'a': 'apple'},
  {'foo': true, 'bar': false, 'baz': null},
  {'boolean, true': true, 'boolean, false': false, 'null': null },
  // basic nesting
  {'a': {'b': 'c'}},
  {'a': ['b', 'c']},
  [{'a': 'b'}, {'c': 'd'}],
  {'a': [], 'c': {}, 'b': true}
];

// used for stringifyJSON spec
// hint: JSON does not allow you to stringify functions or
// undefined values, so you should skip those key/value pairs.

unstringifiableValues = [
  {
    'functions': function() {},
    'undefined': undefined
  }
];
*/

var stringifyJSON = function(obj) {
  // Check if Obj or array or string or number
  // Null or undefined or function or boolean
  // Array then Obj
  /* Possible Inputs

     Number -- Turn to string
     Null
     Boolean

     String - Add extra "" around

     function  -- Get Ignored and get skipped
     Undefined --

     Array - Create Array

     Object - Create Object
  */
  let typeOf = typeof obj;
  if (typeOf === 'number' || obj === null || typeOf === 'boolean') {
    return obj + '';
  }
  if (typeOf === 'string') {
    return '"' + obj + '"';
  }
  if (typeOf === 'function' || obj === undefined) {
    return '';
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      return '[]';
    }
    let tempArray = [];
    obj.forEach(function(element) {
      tempArray.push(stringifyJSON(element));
    });
    return `[${tempArray.join(',')}]`;
  }
  if (typeof obj === 'object') {
    if (Object.keys(obj).length === 0) {
      return '{}';
    }
    let tempArray = [];
    for (let key in obj) {
      let keyString = `"${key}"`;
      let value = stringifyJSON(obj[key]);
      if (typeof obj[key] !== 'function' && obj[key] !== undefined) {
        tempArray.push(`${keyString}:${value}`);
      }

    }
    return `{${tempArray.join(',')}}`;

  }


};
console.log(stringifyJSON(9));
console.log(stringifyJSON(null));
console.log(stringifyJSON(true));
console.log(stringifyJSON('hello world'));
console.log(stringifyJSON(function() {}));
console.log(stringifyJSON(undefined));

console.log(typeof stringifyJSON(9));
console.log(typeof stringifyJSON(null));
console.log(typeof stringifyJSON(true));
console.log(typeof stringifyJSON('hello world'));
console.log(typeof stringifyJSON(function() {}));
console.log(typeof stringifyJSON(undefined));


console.log(stringifyJSON([]));
console.log(stringifyJSON([8]));
console.log(stringifyJSON(['hi']));
console.log(stringifyJSON([8, 'hi']));
console.log(stringifyJSON([1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]));
console.log(stringifyJSON([8, [[], 3, 4]]));
console.log(stringifyJSON([[[['foo']]]]));
console.log(stringifyJSON({}));
console.log(stringifyJSON({'a': 'apple'}));
console.log(stringifyJSON({'foo': true, 'bar': false, 'baz': null}));
console.log(stringifyJSON({'boolean, true': true, 'boolean, false': false, 'null': null }));
// basic nesting
console.log(stringifyJSON({'a': {'b': 'c'}}));
console.log(stringifyJSON({'a': ['b', 'c']}));
console.log(stringifyJSON([{'a': 'b'}, {'c': 'd'}]));
console.log(stringifyJSON({'a': [], 'c': {}, 'b': true}));


console.log(typeof stringifyJSON([]));
console.log(typeof stringifyJSON([8]));
console.log(typeof stringifyJSON(['hi']));
console.log(typeof stringifyJSON([8, 'hi']));
console.log(typeof stringifyJSON([1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]));
console.log(typeof stringifyJSON([8, [[], 3, 4]]));
console.log(typeof stringifyJSON([[[['foo']]]]));
console.log(typeof stringifyJSON({}));
console.log(typeof stringifyJSON({'a': 'apple'}));
console.log(typeof stringifyJSON({'foo': true, 'bar': false, 'baz': null}));
console.log(typeof stringifyJSON({'boolean, true': true, 'boolean, false': false, 'null': null }));
// basic nesting
console.log(typeof stringifyJSON({'a': {'b': 'c'}}));
console.log(typeof stringifyJSON({'a': ['b', 'c']}));
console.log(typeof stringifyJSON([{'a': 'b'}, {'c': 'd'}]));
console.log(typeof stringifyJSON({'a': [], 'c': {}, 'b': true}));