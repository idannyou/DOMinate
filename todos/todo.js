const Post = require('./post.js');
const Map = require('./map.js');

DOMinate(() => {
  let post = new Post();
  let map = new Map();
  DOMinate('.add-to-do').on('click', () => post.addToDo());
  DOMinate('.finish-all').on('click', () => clearAllToDo());
  // Drag options
  document.addEventListener('drag', () => {});
  document.addEventListener('dragstart', (event) => handleDrag(event));
  document.addEventListener("dragover",  (event) => {
    event.preventDefault();
  });
  document.addEventListener('drop', (event) => handleDrop(event));
  // Add gifs
  DOMinate('.add-gif').on('click', () => post.getGif());

  // google map
  map.getPos();
});

const clearAllToDo = function(){
  DOMinate('#finish').empty();
};

// dragging

let dragged;

const handleDrag = function(event){
  dragged = event.target;
};

const handleDrop = function(event){
  event.preventDefault();
  if ( event.target.className == "dropzone" ) {
         dragged.parentNode.removeChild( dragged );
         event.target.appendChild( dragged );
  }
};

//
