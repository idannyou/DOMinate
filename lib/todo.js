

DOMinate(() => {
  DOMinate('.add-to-do').on('click', () => addToDo());
  DOMinate('.get-weather').on('click', () => getPos());
  DOMinate('.finish-all').on('click', () => clearAllToDo());
  document.addEventListener('drag', () => {});
  document.addEventListener('dragstart', (event) => handleDrag(event));
  document.addEventListener("dragover",  (event) => {
    event.preventDefault();
  });
  document.addEventListener('drop', (event) => handleDrop(event));
});

const addToDo = function(){
  let eleLi = document.createElement('li');
  DOMinate(eleLi).append(addInputButton());
  DOMinate(eleLi).append(deleteButton());
  DOMinate('ul').append(eleLi);
};

const addInputButton = function(){
  let eleInput = document.createElement('input');
  DOMinate(eleInput).attr('type', 'text');
  return eleInput;
};

const deleteButton = function(){
  let buttonEle = document.createElement('button');
  DOMinate(buttonEle).addClass('delete');
  buttonEle.innerHTML = 'Remove';
  DOMinate(buttonEle).on('click', () => deleteToDo());
  return buttonEle;
};

const deleteToDo = function(){
  DOMinate(event.target).parent().remove();
};

const getPos = function(){
  navigator.geolocation.getCurrentPosition(getWeather);
};

const getWeather = function(pos){
  let lat = pos.coords.latitude;
  let lon = pos.coords.longitude;
  DOMinate.ajax({
      type: 'GET',
      url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bcb83c4b54aee8418983c2aff3073b3b`,
      success(data) {
        parseWeather(data);
      },
      error() {
        console.error("An error occurred.");
      },
   });
};

const parseWeather = function(data){
  let dataJSON = JSON.parse(data);
  console.log(dataJSON)
  let weatherIcon = dataJSON.weather[0].icon;
  let temperature = DOMinate('#weather');
  let icon = DOMinate('#weather-img');
  let fTemp = Math.round((dataJSON.main.temp * (9/5) - 459.67)*100)/100;
  temperature.attr('value',`${fTemp}`);
  icon.attr('src',`http://openweathermap.org/img/w/${weatherIcon}.png`);
};

const clearAllToDo = function(){
  DOMinate('.todo').empty();
};

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
