// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here

  var index = 0;
  var char = function() {
    return json[index];
  };
  var nonWhiteSpace = function() {
    while (json[index] === ' ') {
      index++;
    }
    return char();
  };
  // 'true' -- true
  // 'false' -- false
  // 'null' -- null
  var parseValue = function() {
    if (!isNaN(+char()) || char() === '-') {
      return parseNumbers();
    } else if (char() === '"') {
      return parseString();
    } else if (char() === '[') {
      return parseArr();
    } else if (char() === '{') {
      return parseObj();
    } else if (json.substr(index, 4) === 'null') {
      index += 4;
      return null;
    } else if (json.substr(index, 4) === 'true') {
      index += 4;
      nonWhiteSpace();
      return true;
    } else if (json.substr(index, 5) === 'false') {
      index += 5;
      nonWhiteSpace();
      return false;
    }


  };

  // '"' -- Start a string
  var parseString = function() {
    index++;
    let string = '';
    while (char() !== '"') {
      if (char() === '/') {
        string += char();
      }
      string += char();
      index++;
    }
    index++;
    nonWhiteSpace();
    return string;
  };

  // '3' -- number
  var parseNumbers = function() {
    // number or -
    // when does it end: when it's anything but a period, number or hyphen
    let num = '';
    while (!isNaN(+ char()) || char() === '.'|| char() === '-') {
      num += char();
      index++;
    }
    nonWhiteSpace();
    return +num;
  };




  // '[' -- Create an array
  // ']' -- Finish array
  var parseArr = function() {
    let arr = [];
    index++;
    while (char() !== ']') {
      if (char() === ',') {
        index++;
        nonWhiteSpace();
      }
      arr.push(parseValue());
      nonWhiteSpace();
    }
    index++;
    nonWhiteSpace();
    return arr;
  };

  var parseElements = function() {

    return parseValue();


  };

  // '{' -- Create an object
  // '}' -- Finish object
  var parseObj = function() {
    let obj = {};
    index++;
    nonWhiteSpace();
    while (char() !== '}') {
      Object.assign(obj, parseMembers());
    }
    index++;
    nonWhiteSpace();
    return obj;
  };

  var parseMembers = function() {
    let objPair = {};
    while (char() !== ',' && char() !== '}') {
      Object.assign(objPair, parsePair());
      nonWhiteSpace();

      if (char() === ',') {
        index++;
        nonWhiteSpace();
      }
    }
    return objPair;
  };

  var parsePair = function() {
    // invoke parseString on key
    // {"key": value}
    // invoke parseValue on value
    var key = parseString();
    index++;
    nonWhiteSpace();
    var value = parseValue();
    var obj = {};
    obj[key] = value;
    return obj;

  };


  return parseValue();
};
// Here is Jonathan's comment!
console.log(parseJSON('null'));
console.log(parseJSON('false'));
console.log(parseJSON('true'));
console.log(parseJSON('"I am a string"'));
console.log(typeof parseJSON('"I am a string"'));
console.log(parseJSON('-1234'));
console.log(parseJSON('-1234.567'));
console.log(typeof parseJSON('-1234'));
console.log(typeof parseJSON('-1234.567'));
console.log(parseJSON('[]'));
console.log(typeof parseJSON('[]'));
console.log(parseJSON('["string", "strong", 1, [], [[]], null]'));
console.log(parseJSON('{}'));
console.log(typeof parseJSON('{}'));
console.log(parseJSON('{"a": "b", "c": "d"}'));
console.log(typeof parseJSON('{"a": "b", "c": "d"}'));
console.log(parseJSON('{"foo": true, "bar": false, "baz": null, "test": true}'));
console.log(typeof parseJSON('{"foo": true, "bar": false, "baz": null}'));
console.log(parseJSON('{"a": "b", "c": "d"}'));
console.log(typeof parseJSON('{"a": "b", "c": "d"}'));
console.log(parseJSON('{"baz": false, "bazs": null}'));
console.log(parseJSON('["\\\\\\"\\"a\\""]'));
console.log(typeof parseJSON('{"a": "b", "c": "d"}'));
/*
console.log('{"CoreletAPIVersion":2,"CoreletType":"standalone",' +
  '"documentation":"A corelet that provides the capability to upload' +
  ' a folderâ€™s contents into a userâ€™s locker.","functions":[' +
  '{"documentation":"Displays a dialog box that allows user to ' +
  'select a folder on the local system.","name":' +
  '"ShowBrowseDialog","parameters":[{"documentation":"The ' +
  'callback function for results.","name":"callback","required":' +
  'true,"type":"callback"}]},{"documentation":"Uploads all mp3 files' +
  ' in the folder provided.","name":"UploadFolder","parameters":' +
  '[{"documentation":"The path to upload mp3 files from."' +
  ',"name":"path","required":true,"type":"string"},{"documentation":' +
  ' "The callback function for progress.","name":"callback",' +
  '"required":true,"type":"callback"}]},{"documentation":"Returns' +
  ' the server name to the current locker service.",' +
  '"name":"GetLockerService","parameters":[]},{"documentation":' +
  '"Changes the name of the locker service.","name":"SetLockerSer' +
  'vice","parameters":[{"documentation":"The value of the locker' +
  ' service to set active.","name":"LockerService","required":true' +
  ',"type":"string"}]},{"documentation":"Downloads locker files to' +
  ' the suggested folder.","name":"DownloadFile","parameters":[{"' +
  'documentation":"The origin path of the locker file.",' +
  '"name":"path","required":true,"type":"string"},{"documentation"' +
  ':"The Window destination path of the locker file.",' +
  '"name":"destination","required":true,"type":"integer"},{"docum' +
  'entation":"The callback function for progress.","name":' +
  '"callback","required":true,"type":"callback"}]}],' +
  '"name":"LockerUploader","version":{"major":0,' +
  '"micro":1,"minor":0},"versionString":"0.0.1"}',
  '{ "firstName": "John", "lastName" : "Smith", "age" : ' +
    '25, "address" : { "streetAddress": "21 2nd Street", ' +
    '"city" : "New York", "state" : "NY", "postalCode" : ' +
    ' "10021" }, "phoneNumber": [ { "type" : "home", ' +
    '"number": "212 555-1234" }, { "type" : "fax", ' +
    '"number": "646 555-4567" } ] }')

*/
/*
parseableStrings = [
  // basic stuff
  '[]',
  '{"foo": ""}',
  '{}',
  '{"foo": "bar"}',
  '["one", "two"]',
  '{"a": "b", "c": "d"}',
  '[null,false,true]',
  '{"foo": true, "bar": false, "baz": null}',
  '[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]',
  '{"boolean, true": true, "boolean, false": false, "null": null }',

  // basic nesting
  '{"a":{"b":"c"}}',
  '{"a":["b", "c"]}',
  '[{"a":"b"}, {"c":"d"}]',
  '{"a":[],"c": {}, "b": true}',
  '[[[["foo"]]]]',

  // escaping
  '["\\\\\\"\\"a\\""]',
  '["and you can\'t escape thi\s"]',

  // everything all at once
  '{"CoreletAPIVersion":2,"CoreletType":"standalone",' +
    '"documentation":"A corelet that provides the capability to upload' +
    ' a folderâ€™s contents into a userâ€™s locker.","functions":[' +
    '{"documentation":"Displays a dialog box that allows user to ' +
    'select a folder on the local system.","name":' +
    '"ShowBrowseDialog","parameters":[{"documentation":"The ' +
    'callback function for results.","name":"callback","required":' +
    'true,"type":"callback"}]},{"documentation":"Uploads all mp3 files' +
    ' in the folder provided.","name":"UploadFolder","parameters":' +
    '[{"documentation":"The path to upload mp3 files from."' +
    ',"name":"path","required":true,"type":"string"},{"documentation":' +
    ' "The callback function for progress.","name":"callback",' +
    '"required":true,"type":"callback"}]},{"documentation":"Returns' +
    ' the server name to the current locker service.",' +
    '"name":"GetLockerService","parameters":[]},{"documentation":' +
    '"Changes the name of the locker service.","name":"SetLockerSer' +
    'vice","parameters":[{"documentation":"The value of the locker' +
    ' service to set active.","name":"LockerService","required":true' +
    ',"type":"string"}]},{"documentation":"Downloads locker files to' +
    ' the suggested folder.","name":"DownloadFile","parameters":[{"' +
    'documentation":"The origin path of the locker file.",' +
    '"name":"path","required":true,"type":"string"},{"documentation"' +
    ':"The Window destination path of the locker file.",' +
    '"name":"destination","required":true,"type":"integer"},{"docum' +
    'entation":"The callback function for progress.","name":' +
    '"callback","required":true,"type":"callback"}]}],' +
    '"name":"LockerUploader","version":{"major":0,' +
    '"micro":1,"minor":0},"versionString":"0.0.1"}',
  '{ "firstName": "John", "lastName" : "Smith", "age" : ' +
    '25, "address" : { "streetAddress": "21 2nd Street", ' +
    '"city" : "New York", "state" : "NY", "postalCode" : ' +
    ' "10021" }, "phoneNumber": [ { "type" : "home", ' +
    '"number": "212 555-1234" }, { "type" : "fax", ' +
    '"number": "646 555-4567" } ] }',
  '{\r\n' +
    '          "glossary": {\n' +
    '              "title": "example glossary",\n\r' +
    '      \t\t"GlossDiv": {\r\n' +
    '                  "title": "S",\r\n' +
    '      \t\t\t"GlossList": {\r\n' +
    '                      "GlossEntry": {\r\n' +
    '                          "ID": "SGML",\r\n' +
    '      \t\t\t\t\t"SortAs": "SGML",\r\n' +
    '      \t\t\t\t\t"GlossTerm": "Standard Generalized ' +
    'Markup Language",\r\n' +
    '      \t\t\t\t\t"Acronym": "SGML",\r\n' +
    '      \t\t\t\t\t"Abbrev": "ISO 8879:1986",\r\n' +
    '      \t\t\t\t\t"GlossDef": {\r\n' +
    '                              "para": "A meta-markup language,' +
    ' used to create markup languages such as DocBook.",\r\n' +
    '      \t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]\r\n' +
    '                          },\r\n' +
    '      \t\t\t\t\t"GlossSee": "markup"\r\n' +
    '                      }\r\n' +
    '                  }\r\n' +
    '              }\r\n' +
    '          }\r\n' +
    '      }\r\n'
];

// JSON does not allow you to parse these strings
unparseableStrings = [
  '["foo", "bar"',
  '["foo", "bar\\"]'
];
*/
