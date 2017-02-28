
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
