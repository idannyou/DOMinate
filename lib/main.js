const DOMNodeCollection = require('./dom_node_collection.js');

let HTMLArray = [];
let FunctionArray = [];
let loaded = false;

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

  //Runs the function if the document is loaded, pushes the function into an Array if the document isn't loaded.
  if (typeof(arg) === 'function'){
    if( loaded === false){
      FunctionArray.push(arg);
      return FunctionArray;
    } else {
      arg();
    }
  }
};

$l.extend = function(base,...objs){
  let hashObj = {};
  Object.keys(base).map(
    ele => hashObj[ele] = base[ele]
  );
  objs.forEach(obj => {
    Object.keys(obj).map(
      ele => {
        hashObj[ele] = obj[ele];
        base[ele] = obj[ele];
      }
    );
  });
  return hashObj;
};

$l.ajax = function(obj){
  const xhr = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };
  obj = $l.extend(defaults, obj);
  xhr.open(obj.method, obj.url, true);
  xhr.onload = () => {
    if (xhr.status === 200){
      obj.success(xhr.response);
    } else {
      obj.error(xhr.response);
    }
  };
  xhr.send(JSON.stringify(obj.data));
};

// Creating a new function $l and adding it to the window so that DOMinate can be used/tested in console!
window.$l = $l;

document.addEventListener('DOMContentLoaded', () => {
  loaded = true;
  FunctionArray.forEach((ele) => {
    ele();
  });

});
