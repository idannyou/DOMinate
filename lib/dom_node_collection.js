
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
