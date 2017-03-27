class Map {

  constructor(pos){
    this.map = null;
    this.currPos = pos;
    this.newPos = null;
    this.markers={};
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
  }

  createSearch(){
    this.deleteSearch();
    let inputEle = document.createElement('input');
    DOMinate(inputEle).attr({type:'text', id:'pac-input'});
    DOMinate('.main-container').append(inputEle);
  }

  deleteSearch(){
    debugger
    DOMinate('#pac-input')
  }

  createEventClick(){
    this.map.addListener('click', (event) => this.getCoord(event));
  }
  //
  getCoord(event){
    this.confirmLocation(event);
  }

  confirmLocation(event){
    let confirmLoc = confirm('Confirm ToDo Location');
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
    const mapOptions = {
        center: this.newPos,
            zoom: 13
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.setMarker('currPos', this.currPos);
    this.setMarker('newPos', this.newPos);
    this.createEventClick();
    this.createSearch();
    this.searchPlaces();
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
