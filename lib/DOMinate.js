/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection{


	  constructor(HTMLArray){
	    this.HTMLArray = HTMLArray;

	  }

	// html returns the first inner html of the selector as a string if no string arg is passed, else
	//   replaces the inner html of the selector with the string arg.

	  html(string){
	    if (string){
	      for (var i = 0; i < this.HTMLArray.length; i++) {
	        this.HTMLArray[i].innerHTML = string;
	      }
	    } else {
	      this.HTMLArray[0].innerHTML;
	    }
	    return this.HTMLArray;
	  }

	// this method clears out the content of all nodes in HTMLArray
	  empty(){
	    this.html(" ");
	    return this.HTMLArray;
	  }

	// Currently this method does not parse html string (ex:'<div>asdf</div>')
	  append(string){
	    for (var i = 0; i < this.HTMLArray.length; i++) {
	      this.HTMLArray[i].append(string);
	    }
	    return this.HTMLArray;
	  }

	  attr(...arg){
	    if(arg.length === 1 && typeof(arg[0]) !== 'object'){
	      return this.HTMLArray[0].getAttribute(arg);
	    } else if(arg.length === 2){
	      for (var i = 0; i < this.HTMLArray.length; i++) {
	        this.HTMLArray[i].setAttribute(arg[0], arg[1]);
	      }
	    } else if(typeof(arg[0]) == 'object'){
	      let argObj = arg[0];
	      for (var i = 0; i < this.HTMLArray.length; i++) {
	        Object.keys(argObj).map((key) => {
	          return this.HTMLArray[i].setAttribute(key, arg[0][key]);
	        });
	      }

	    }
	    return this.HTMLArray;
	  }

	  addClass(string){
	    this.HTMLArray.map((ele)=> {
	      return ele.classList.add(string);
	    });

	    return this.HTMLArray;
	  }

	  removeClass(string){
	    this.HTMLArray.map((ele)=> {
	      return ele.classList.remove(string);
	    });

	    return this.HTMLArray;
	  }

	  children(){
	    return new DOMNodeCollection(this.HTMLArray[0].children);
	  }

	  parent(){
	    return new DOMNodeCollection([this.HTMLArray[0].parentNode]);
	  }

	// returns an HTML array that contains the string arg
	  find(string){
	    return this.HTMLArray[0].querySelectorAll(string);
	  }

	  remove(){
	    let removeEle = this.HTMLArray[0];
	    if (removeEle){
	      removeEle.remove();
	      return new DOMNodeCollection([removeEle]);
	    } else {
	      return [];
	    }
	  }

	  // Event Listeners

	  on(type, callBack){
	    // store eventType as an object in the ele, so removing eventType later will be easier
	    this.HTMLArray.map(
	      (ele) => {
	        ele.addEventListener(type, callBack);
	        // need to create random name, type name is reserved name in ele
	        let eventKey = `event-${type}`;
	        if (typeof ele[eventKey] === 'undefined'){
	          ele[eventKey] = [eventKey];
	        }
	        ele[eventKey].push(callBack);
	      }
	    );
	    return this.HTMLArray;
	  }

	  off(type){
	    let eventKey = `event-${type}`;
	    this.HTMLArray.map(
	      (ele) => {
	        for (var i = 0; i < ele[eventKey].length; i++) {
	          ele.removeEventListener(type, ele[eventKey][i]);
	        }
	        delete ele[eventKey];
	      }
	    );
	    return this.HTMLArray;
	  }


	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);