var api = "https://fcc-weather-api.glitch.me/api/current?";
// var lat, lon;
var tempUnit = 'C';
var currentTempInCelsius;
var options = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 10000
};

$( document ).ready(function(){
  if (navigator.geolocation) {
    console.log(" I am ready?",navigator.geolocation)
    
    navigator.geolocation.getCurrentPosition(success=>{
      console.log("success ",success)
      var lat = "lat=" + success.coords.latitude;
      var lon = "lon=" + success.coords.longitude;
      // console.log("lat and lon ",lat,lon)
    getWeather(lat, lon); 
    },error=>{
      console.log("error", error)
    },options)
     } else {
    console.log("Geolocation is not supported by this browser.");
  }
  $("#tempunit").click(function () {
    var currentTempUnit = $("#tempunit").text();
    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#tempunit").text(newTempUnit);
    if (newTempUnit == "F") {
      var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(fahTemp + " " + String.fromCharCode(176));
    } else {
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
    }
  });
})

function getWeather(lat, lon) {
  var urlString = api + lat + "&" + lon;
 
  $.ajax({
    type:"GET",
    url: urlString, success: function (result) {
     console.log(result.sentence);
      $("#city").text(result.name + ", ");
      $("#country").text(result.sys.country);
      currentTempInCelsius = Math.round(result.main.temp );
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      $("#tempunit").text(tempUnit);
      $("#desc").text(result.weather[0].main);
      
    }
  });
}

function getWeather(lat, lon) {
  var urlString = api + lat + "&" + lon;
 console.log("url is ",urlString)
  $.ajax({
    type:"GET",
    url: urlString, success: function (result) {
     console.log(result.sentence);
      $("#city").text(result.name + ", ");
      $("#country").text(result.sys.country);
      currentTempInCelsius = Math.round(result.main.temp );
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      $("#tempunit").text(tempUnit);
      $("#desc").text(result.weather[0].main);
      
    }
  });
}

loadBackground = function (desc) {
    var desc = desc.toLowerCase();
  console.log(desc)
    switch (desc) {
      case 'light rain':
        $('#weather').css("background-image", "url(https://www.geo.tv/assets/uploads/updates/2017-06-26/147089_5166454_updates.jpg)");
        break;
      case 'clouds':
        $('#weather').css("background-image", "url(https://www.femcafe.hu/sites/default/files/images/dramatic-clouds.jpg)");    
        break;
      case 'rain':
        $('#weather').css("background-image", "url(http://republika.mk/wp-content/uploads/2013/07/grad2.jpg)");
        break;
      case 'snow':
        $('#weather').css("background-image", "url(https://www.walldevil.com/wallpapers/a52/snow-wallpaper-scene-nature-weather-scenery-albums.jpg)");
        break;
      case 'clear':
        $('#weather').css("background-image", "url(http://cache3.asset-cache.net/xd/479233488.jpg?v=1&c=IWSAsset&k=2&d=62CA815BFB1CE480904DC2BDF8D84279DD9BE2D9A1DB104C6FCD593B398CCC9B4C7E1CCD6B915F7E)");
        break;
      case 'thunderstom':
       $('#weather').css("background-image", "url(https://s-media-cache-ak0.pinimg.com/564x/7e/fb/1e/7efb1e6d25184aac0998fb966732325d.jpg)");
        break;
      default:
        $('#weather').css("background-image", "url(http://exchangedownloads.smarttech.com/public/content/c7/c7b7d2f6-0e68-41bc-b320-063ae2783f69/previews/medium/0001.png)");
        break;
    }
  }