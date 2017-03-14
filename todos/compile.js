/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Post = __webpack_require__(1);
	const Map = __webpack_require__(2);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Map {

	  constructor(){

	  }

	}

	module.exports = Map;


/***/ }
/******/ ]);