// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:



var getElementsByClassName = function(className) {
  if (this === window) {
    return getElementsByClassName.call(document.body, className);
  }
  let matchingNodes = [];
  if (this.classList && this.classList.contains(className)) {
    matchingNodes.push(this);
  }
  if (this.childNodes) {
    this.childNodes.forEach(child => {
      matchingNodes = matchingNodes.concat(getElementsByClassName.call(child, className));
    });
  }

  return matchingNodes;
  // your code here
};
console.log(getElementsByClassName('targetClassName'));
