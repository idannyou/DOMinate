const Post = require('./post.js');

DOMinate(() => {
  setPosition();
  // add Post
  DOMinate('.add-to-do').on('click', () => createPost());
  DOMinate('.finish-all').on('click', () => clearAllToDo());
  // Add gifs
  DOMinate('.add-gif').on('click', () => createGif());
  // Drag options
  document.addEventListener('drag', () => {});
  document.addEventListener('dragstart', (event) => handleDrag(event));
  document.addEventListener("dragover",  (event) => {
    event.preventDefault();
  });
  document.addEventListener('drop', (event) => handleDrop(event));
});

let currPos;

const setPosition = function(){
  navigator.geolocation.getCurrentPosition((pos) => {
    currPos = {lat: pos.coords.latitude, lng: pos.coords.longitude};
    setGPSIndicator();
  });
};

const setGPSIndicator = function(){
  DOMinate('.position').removeClass('red');
  DOMinate('.position').addClass('green');
  showPos();
};

const showPos = function(){
  DOMinate('.no-show').html('Position Ready');
};

const createPost = function(){
  const post = new Post(currPos);
  post.addToDo();
};

const createGif = function(){
  const post = new Post();
  post.getGif();
};

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
