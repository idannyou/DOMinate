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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Map = __webpack_require__(2);

	class Post {

	  constructor(pos){
	    this.map = null;
	    this.pos = pos;
	  }

	  addToDo(){
	    let eleLi = document.createElement('div');
	    DOMinate(eleLi).attr({id:'draggable', draggable: true});
	    DOMinate(eleLi).append(this.deleteButton());
	    DOMinate(eleLi).append(this.addInputButton());

	    if (this.pos){
	      DOMinate(eleLi).append(this.addMapButton());
	    }

	    DOMinate('#to-dos').append(eleLi);
	  }

	  addInputButton(){
	    let eleInput = document.createElement('textarea');
	    return eleInput;
	  }

	  addMapButton(){
	    let buttonEle = document.createElement('button');
	    DOMinate(buttonEle).addClass('post-map');
	    buttonEle.innerHTML = '&#8982;';
	    DOMinate(buttonEle).on('click', () => this.createMap());
	    return buttonEle;
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
	    const img = document.createElement('img');
	    DOMinate(div).attr({id:'draggable', draggable: true});
	    DOMinate(img).attr({type:'image', draggable: false});
	    DOMinate(div).append(this.deleteButton());
	    const gif = JSON.parse(data).data;
	    img.src = gif.image_original_url;
	    DOMinate(div).append(img);
	    DOMinate('#to-dos').append(div);
	  }

	  //Add map
	  createMap(){
	    if (this.map){
	      this.map.setMap();
	    } else {
	      this.map = new Map(this.pos);
	    }

	  }

	}

	module.exports = Post;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Map {

	  constructor(pos){
	    this.map = null;
	    this.currPos = pos;
	    this.newPos = null;
	    this.markers={};
	    this.closeMap = this.closeMap.bind(this);
	    this.createMap();
	    this.setMarker('currPos', pos);
	    this.createEventClick();
	  }

	  createMap(){
	    const mapOptions = {
	        center: this.currPos,
	        zoom: 13
	      };
	    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
	    this.map = map;
	    this.createSearch();
	    this.searchPlaces();
	    this.changeMapZIndex(2000);
	    this.addEventListener();
	    // DOMinate('#map').removeClass('hidden');
	  }

	  addEventListener(){
	      document.addEventListener('click', (event) => this.closeMap(event));
	  }

	  closeMap(event){
	    if(!(event.target.classList[0]==="post-map" ||
	          event.target.parentElement.parentElement.classList[0]==="gm-style" ||
	          event.target.id==="pac-input")){
	      document.getElementById('map').style.zIndex=-1;
	      // DOMinate('#map').addClass('hidden');
	    }
	  }

	  changeMapZIndex(num){
	    document.getElementById('map').style.zIndex=num;
	  }

	  deleteSearch(){
	    DOMinate('.pac-container').remove();
	  }

	  createSearch(){
	    this.deleteSearch();
	    let inputEle = document.createElement('input');
	    DOMinate(inputEle).attr({type:'text', id:'pac-input'});
	    DOMinate('#map').append(inputEle);
	  }

	  createEventClick(){
	    this.map.addListener('click', (event) => this.getCoord(event));
	  }
	  //
	  getCoord(event){
	    this.confirmLocation(event);
	  }

	  confirmLocation(event){
	    let confirmLoc = confirm('Confirm To Do Location');
	    if (confirmLoc){
	      this.newPos = {lat: event.latLng.lat(), lng: event.latLng.lng()};
	      this.setMarker('newPos', this.newPos);
	    } else {
	      alert('Pick Another Location');
	    }
	  }
	  //
	  //
	  setMarker(name, latLngObj){
	    this.deleteMarker();
	    var marker = new google.maps.Marker({
	      position: latLngObj,
	      map: this.map
	    });
	    this.markers[name]=marker;
	  }

	  deleteMarker(){
	    if(!this.markers['newPos']){
	      return null;
	    }
	    this.markers['newPos'].setMap(null);
	    delete this.markers['newPos'];
	  }

	  setMap(){
	    let pos = (this.newPos)? this.newPos : this.currPos;
	    const mapOptions = {
	        center: pos,
	            zoom: 13
	    };
	    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
	    this.setMarker('currPos', this.currPos);
	    this.setMarker('newPos', this.newPos);
	    this.createEventClick();
	    this.createSearch();
	    this.searchPlaces();
	    this.changeMapZIndex(2000);
	    // DOMinate('#map').removeClass('hidden');
	  }
	  // //
	  // // // google search from google API webpage
	  // //
	  searchPlaces(){
	    // Create the search box and link it to the UI element.
	    var input = document.getElementById('pac-input');
	    var searchBox = new google.maps.places.SearchBox(input);
	    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	    // Bias the SearchBox results towards current map's viewport.
	    let map = this.map;
	    map.addListener('bounds_changed', function() {
	      searchBox.setBounds(map.getBounds());
	    });

	      var markers = [];
	      // Listen for the event fired when the user selects a prediction and retrieve
	      // more details for that place.
	      searchBox.addListener('places_changed', function() {
	        var places = searchBox.getPlaces();

	        if (places.length === 0) {
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
	  }


	}

	module.exports = Map;


/***/ }
/******/ ]);