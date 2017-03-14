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
  getPos();

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

// google map
const getPos = function(){
  navigator.geolocation.getCurrentPosition(createMap);
};

const createMap = function(pos){
  let posCoord = { lat: pos.coords.latitude, lng: pos.coords.longitude };
  const mapOptions = {
      center: posCoord,
      zoom: 13
    };
  const map = new google.maps.Map(document.getElementById('map'), mapOptions);
  setMarker(posCoord, map);
};


const setMarker = function(latlngObj, map){
  var marker = new google.maps.Marker({
    position: latlngObj,
    map: map
  });

  searchPlaces(map);

};

// google search

const searchPlaces = function(map){
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
};
