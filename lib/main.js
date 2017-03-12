const DOMNodeCollection = require('./dom_node_collection.js');

let FunctionArray = [];
let loaded = false;

const DOMinate = function(arg){

  // If the arg is a string, then it will return all child elements that matches a specified CSS selector(s) of an element
  if (typeof(arg) === 'string'){
    let elements = Array.from(document.querySelectorAll(arg));
    return new DOMNodeCollection(elements);
  }

  if (arg instanceof HTMLElement){
    return new DOMNodeCollection([arg]);
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

DOMinate.extend = function(base,...objs){
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

DOMinate.ajax = function (options) {

  return new Promise( (resolve, reject) => {
    const defaults = {
      method: 'get',
      url: '',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {},
      success: () => {},
      error: () => {},
      dataType: 'jsonp'
    };
    DOMinate.extend(defaults, options);

    const xhr = new XMLHttpRequest();
    xhr.open(defaults.method, defaults.url);
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        defaults.success(xhr.response);
        resolve(xhr.response);
      } else {
        defaults.error(xhr.response);
        reject(xhr.responseText);
      }
    };
    xhr.send(JSON.stringify(defaults.data));
  });
};

// Creating a new function DOMinate and adding it to the window so that DOMinate can be used/tested in console!
window.DOMinate = DOMinate;

document.addEventListener('DOMContentLoaded', () => {
  loaded = true;
  FunctionArray.forEach((ele) => {
    ele();
  });

});
