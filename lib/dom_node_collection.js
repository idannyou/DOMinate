
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
      let text = new Text(string);
      this.HTMLArray[i].appendChild(text);
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

  addClass(){
    
  }


}

module.exports = DOMNodeCollection;
