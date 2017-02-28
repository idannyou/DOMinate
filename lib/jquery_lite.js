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

	// Creating a new function $l and adding it to the window so that DOMinate can be used/tested in console!
	const $l = function(arg){

	  // If the arg is a string, then it will return all child elements that matches a specified CSS selector(s) of an element
	  if (typeof(arg) === 'string'){
	    let elements = Array.from(document.querySelectorAll(arg));
	    return new DOMNodeCollection(elements);
	  }

	  if (arg instanceof HTMLElement){
	    let HTMLArray = [];
	    HTMLArray.push(arg);
	    return new DOMNodeCollection(HTMLArray);
	  }

	};

	window.$l = $l;


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
	  }

	// this method clears out the content of all nodes in HTMLArray
	  empty(){
	    this.html('');
	  }


	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);