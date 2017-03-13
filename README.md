# DOMinate

[Live!][DOMinate]
[DOMinate]: http://dannyou.pro/DOMinate

DOMinate is a JavaScript DOM interaction library inspired by jQuery.  Using DOMinate, users can:
  * Select single or multiple DOM elements
  * Traverse and manipulate DOM elements
  * Build DOM elements
  * Create `DOMNodeCollection` objects from `HTMLElement`s
  * Queue functions until DOM is fully loaded
  * HTTP requests

## Getting Started

The quickest way to get started with DOMinate is to download this library into your project and include the webpack output `DOMinate.js` in your source code.

```html
<head>
  <script src="./lib/DOMinate.js"></script>
  ...
</head>
```

## API

[`DOMinate`](#l)  

[DOM Traversal](#dom-traversal)  
  * [`children`](#children)  
  * [`parent`](#parent)  

[DOM Manipulation](#dom-manipulation)  
  * [`html`](#html)  
  * [`empty`](#empty)  
  * [`append`](#append)  
  * [`remove`](#remove)  
  * [`attr`](#attr)  
  * [`addClass`](#addclass)  
  * [`removeClass`](#removeclass)  
  * [`toggleClass`](#toggleclass)  

[Event Listeners](#event-listeners)  
  * [`on`](#on)  
  * [`off`](#off)  

[`DOMinate.ajax`](#lajax)  

### DOMinate

The DOMinate library utilizes the global variable of `DOMinate` as a wrapper for all of the methods in the DOMinate library. For example, `DOMinate("div")` returns a `DOMNodeCollection` object containing all "div" nodes on the DOM page.

`DOMinate` can also be used to create `DOMNodeCollection` objects from unwrapped `HTMLElement`s giving these elements access to DOMinate methods.  

The third use of `DOMinate` takes in a string of HTML code, builds `HTMLElement`(s) from the code, and then wraps the `HTMLElement`(s) in a `DOMNodeCollection` object.

The final use of `DOMinate` is as tool to queue functions to run once the DOM is fully loaded.

### DOM Traversal

`DOMNodeCollection` methods to navigate DOM elements

#### `children`

Returns a `DOMNodeCollection` object containing all of the children elements of every `HTMLElement` in the original `DOMNodeCollection`.  Note that this only includes the direct children.

#### `parent`

Returns a `DOMNodeCollection` object containing the parent elements of every `HTMLElement` in the original `DOMNodeCollection`.  

### DOM Manipulation

`DOMNodeCollection` methods to view and/or change DOM elements

#### `html`

Returns the `innerHTML` for the first element in the `DOMNodeCollection` if no argument is given.

If a string argument is given, the `innerHTML` of each `DOMNodeCollection` element is set to the string argument.

#### `empty`

Removes the innerHTML of each `DOMNodeCollection` element

#### `append`

Takes a single `HTMLElement`, `DOMNodeCollection`, or `string` argument and appends it to each `DOMNodeCollection` element.

#### `remove`

Remove each `DOMNodeCollection` element from the DOM.

#### `attr`

Takes either one (`attr(attribute)`), two (`attr(attribute, value)`), or an object (attr({key1: value1, key2: value2})) as arguments.  If given one argument, the method gets the value of the attribute given for the the first element in the `DOMNodeCollection`. If given two arguments, the method sets the attribute with the value for each `DOMNodeCollection` element. If given an object, the method sets the attribute(keys of the object) with the value (values of the object) for each 'DOMNodeCollection' element.

#### `addClass`

Adds a class, given as an argument, to each `DOMNodeCollection` element.

#### `removeClass`

Removes a class, given as an argument, from each `DOMNodeCollection` element.

#### `toggleClass`

Toggles a class, given as an argument, for each `DOMNodeCollection` element.

### Event Listeners

#### `on`

Adds event listener to each `DOMNodeCollection` element.  List of events are available [here](https://developer.mozilla.org/en-US/docs/Web/Events).

#### `off`

Removes event listener from each `DOMNodeCollection` element.

### DOMinate.ajax

Asynchronous HTTP Request.  Accepts a `Hash` object as an argument with any of the following attributes:
  * method (default: "GET"): HTTP Request method or type
  * url (default: window.location.href): URL for HTTP Request
  * success: success callback
  * error: error callback
  * contentType (default: 'application/x-www-form-urlencoded; charset=UTF-8'): content type of HTTP Request
