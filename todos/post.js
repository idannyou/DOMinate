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

  // Add Gif
  getGif(){
    DOMinate.ajax({
      method: 'GET',
      url: 'https://api.giphy.com/v1/gifs/random?q=to+do+list&api_key=dc6zaTOxFJmzC&rating=pg',
      success: data => this.addGif(data)
    });
  }

  addGif(data){
    const div = document.createElement('div');
    const img = document.createElement('input');
    DOMinate(div).attr({id:'draggable', draggable: true});
    DOMinate(img).attr({type:'image', draggable: false});
    DOMinate(div).append(this.deleteButton());
    const gif = JSON.parse(data).data;
    img.src = gif.image_original_url;
    DOMinate(div).append(img);
    DOMinate('#to-dos').append(div);
  }



}

module.exports = Post;
