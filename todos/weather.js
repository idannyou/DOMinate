// const getPos = function(){
//   navigator.geolocation.getCurrentPosition(getWeather);
// };

// const getWeather = function(pos){
//   let lat = pos.coords.latitude;
//   let lon = pos.coords.longitude;
//   DOMinate.ajax({
//       type: 'GET',
//       url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bcb83c4b54aee8418983c2aff3073b3b`,
//       success(data) {
//         parseWeather(data);
//       },
//       error() {
//         console.error("An error occurred.");
//       },
//   }).then(DOMinate('#weather-img').removeClass('hidden'));
// };

// const parseWeather = function(data){
//   let dataJSON = JSON.parse(data);
//   let weatherIcon = dataJSON.weather[0].icon;
//   let temperature = DOMinate('#weather');
//   let icon = DOMinate('#weather-img');
//   let fTemp = Math.round((dataJSON.main.temp * (9/5) - 459.67)*100)/100;
//   temperature.attr('value',`${fTemp}`);
//   icon.attr('src',`http://openweathermap.org/img/w/${weatherIcon}.png`);
// };
