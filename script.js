var searchBtn = document.getElementById('search_btn');
var apiKey = 'b4c2d5a0bd9132aa04a18c9591435161';
//var lat;
//var lon;
var city;

//Search for a city
searchBtn.addEventListener('click', function () {
  event.preventDefault();
  //Get the value of the search input
  var city = document.getElementById('search_input').value;
  console.log(city);
  //if nothing in input - error and return
  if (!city) {
    console.error('You need a search input value!');
    return;
  }
  //Run the searches
  searchLocationApi(city);
  //searchWeatherApi(lat, lon);
});

var searchLocationApi = function (city) {
  locationUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey;

  fetch(locationUrl)
    //If no response --> throw, if response --> .json()
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })

    //If there's a response --> get value of lon and lat
    .then(function (response) {
      console.log(response);
      lon = response[0].lon
      console.log(window.lon);
      //window.lon = response[0].lon
      lat = response[0].lat
      console.log(lat)
      //window.lat = response[0].lat
    })

    .catch(function (error) {
      console.log(error);
    });
}

console.log(lon);
console.log(lat);

//! In progress
/*var fiveDayForecast = function (lat, lon) {

}*/

//! In progress
var lat;
var lon;
var searchWeatherApi = function (lat, lon) {
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,daily,alerts&appid=' + apiKey + '&units=imperial';
  //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

  fetch(weatherUrl)
    // If no response, throw else return .json()
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })

    //Okay response --> log 'response okay' and the response
    .then(function (response) {
      if (response.ok) {
        console.log('response okay')
        console.log(response);
      }
    })
    //Error --> log error
    .catch(function (error) {
      console.log(error);
    })
};

var displayWeather = function () {
  var weatherCard = document.createElement('div'); //create div for today's weather
  weatherCard.setAttribute('id', 'weather_card');
  var weatherResultsArea = document.getElementById('weather_results');
  weatherResultsArea.appendChild(weatherCard); //append today's weather card to section weather results 

  var weatherTitle = document.createElement('h2'); //Title
  var date = document.createElement('p'); //Date
  var temperature = document.createElement('p');//Temp
  var icon = document.createElement('p') //Icon
  var wind = document.createElement('p');// Wind
  var humidity = document.createElement('p'); //Humidity
  var uvIndex = document.createElement('p'); //UV Index
  //weatherCard.append(weatherTitle, weatherDate, temp, icon, wind, humidity, uvIndex);

  weatherCard.appendChild(weatherTitle);
  //weatherTitle.textContent = "hello"; 
  //date.textContent = ...
  //

  var forecastCard = document.createElement('div'); //create div for forecasts
  forecastCard.setAttribute('id', 'forecast_card');
  var forecastArea = document.getElementById('future_forecast');
  forecastArea.appendChild(forecastCard); //append card to forecast <section>
};
displayWeather();

//var storeSearchHistory = function (){}

//var displaySearchHistory = function(){}