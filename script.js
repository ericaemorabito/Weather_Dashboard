var searchBtn = document.getElementById('search_btn');
var apiKey = '3d47432ac7c1ab60b051887d54809883';
var lat;
var lon;
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
});

//Run search for lat and long
var searchLocationApi = function (city) {
  locationUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey;

  fetch(locationUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })

    .then(function (response) {
      console.log(response);
      lat = response[0].lat
      lon = response[0].lon
      console.log(lat);
      console.log(lon);

      return lat, lon
    })

    .then(function (lat, lon) {
      searchWeatherApi(lat, lon);
    })

    .catch(function (error) {
      console.log(error);
    });
}

//! In progress
var searchWeatherApi = function (lat, lon) {
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
  //var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&units=imperial&appid=' + apiKey;
  //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

  fetch(weatherUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })

    .then(function (response) {
      if (response.ok) {
        console.log('response okay')
        console.log(response);
      }
    })
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