class Post {


  addToDo(){
    let eleLi = document.createElement('div');
    DOMinate(eleLi).attr({id:'draggable', draggable: true});
    DOMinate(eleLi).append(this.deleteButton());
    DOMinate(eleLi).append(this.addInputButton());
    DOMinate('#to-dos').append(eleLi);
  }

  addInputButton(){
    let eleInput = document.createElement('textarea');
    return eleInput;
  }

  deleteButton(){
    let buttonEle = document.createElement('button');
    DOMinate(buttonEle).addClass('delete');
    buttonEle.innerHTML = 'X';
    DOMinate(buttonEle).on('click', () => this.deleteToDo());
    return buttonEle;
  }

  deleteToDo(){
    DOMinate(event.target).parent().remove();
  }



}

module.exports = Post;
