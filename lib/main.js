const DOMNodeCollection = require('./dom_node_collection.js');

// Creating a new function $l and adding it to the window so that DOMinate can be used/tested in console!
let HTMLArray = [];
let FunctionArray = [];

const $l = function(arg){

  // If the arg is a string, then it will return all child elements that matches a specified CSS selector(s) of an element
  if (typeof(arg) === 'string'){
    let elements = Array.from(document.querySelectorAll(arg));
    return new DOMNodeCollection(elements);
  }

  if (arg instanceof HTMLElement){
    HTMLArray.push(arg);
    return new DOMNodeCollection(HTMLArray);
  }

  if (typeof(arg) === 'function'){
    FunctionArray.push(arg);
    return FunctionArray;
  }

};

window.$l = $l;

document.addEventListener('DOMContentLoaded', () => {
  FunctionArray.map(
    
  );

});
