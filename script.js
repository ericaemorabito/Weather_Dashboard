var searchBtn = document.getElementById('search_btn');
var apiKey1 = '3d47432ac7c1ab60b051887d54809883';
//var apiKey2 = '6044df7e3d35bf2ed292ff3acf2fe4d5';
//var apiKey3 = 'bcc18f73623f3ffe4a20dc2347f8d70b';
var apiKeyTry = '6071c23bf014278d29b48f559c2f9755';
var apiKeyNew = 'd7313885a60d7c6813f8bd855485255a';
var lat;
var lon;
var city;

//Search for a city
searchBtn.addEventListener('click', function () {
  event.preventDefault();
  //Get the value of the search input
  city = document.getElementById('search_input').value;
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
  locationUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKeyNew;

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

      return {
        lat: lat,
        lon: lon
      };
    })

    .then(function ({ lat, lon }) {
      searchWeatherApi(lat, lon);
    })

    .catch(function (error) {
      console.log(error);
    });
}

var searchWeatherApi = function (lat, lon) {
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&units=imperial&appid=' + apiKeyTry;

  fetch(weatherUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })

    .then(function (data) {
      console.log('response okay')
      console.log(data);
      this.displayWeather(data);
    })

    .catch(function (error) {
      console.log(error);
    })
};

//! In progress
var displayWeather = function (data) {
  //console.log(data)

  //Get all current Data
  var currentTempData = data.current.temp + '°F';
  var currentIconData = data.current.weather[0].icon;
  var currentWindData = 'Wind: ' + data.current.wind_speed + ' m/hr';
  var currentHumidityData = 'Humidity: ' + data.current.humidity + '%';
  var currentUviData = 'UV Index: ' + data.current.uvi;

  //Testing -> All working
  // console.log(currentTempData)
  // console.log(currentWindData)
  // console.log(currentIconData)
  // console.log(currentHumidityData)
  // console.log(currentUviData)

  //Create and fill in weather card
  var weatherCard = document.createElement('div'); //create div for current weather
  weatherCard.setAttribute('id', 'weather_card');
  var weatherResultsArea = document.getElementById('weather_results');
  weatherResultsArea.appendChild(weatherCard); //append weather card to section weather results 

  var weatherTitle = document.createElement('h2'); //Title
  weatherTitle.textContent = 'Weather in ' + city; //? How can I get this data out easily? It is undefined because it's locally defined.
  var date = document.createElement('p'); //? Date. How can I get the date easily?
  data.textContent = 'Date Here' //?
  var temp = document.createElement('p');//Temp
  temp.textContent = currentTempData;
  var icon = document.createElement('p') //? How to use this code to display the icon? Set it to src'url+icon code' - Within an <img>
  var wind = document.createElement('p');// Wind
  wind.textContent = currentWindData;
  var humidity = document.createElement('p'); //Humidity
  humidity.textContent = currentHumidityData;
  var uvIndex = document.createElement('p'); //UV Index
  uvIndex.textContent = currentUviData;

  //Appends each block of information to the weatherCard
  var currentWeatherInfo = [weatherTitle, date, temp, icon, wind, humidity, uvIndex]
  for (let i = 0; i < currentWeatherInfo.length; i++) {
    weatherCard.appendChild(currentWeatherInfo[i])
  };

  //TODO: set all current data to local storage
  //TODO: create button for city's search history

  //Get 5 days of forecast data
  for (let i = 0; i < 5; i++) {
    //Get all forecast data
    var forecastTempData = data.daily[i].temp.day + '°F';
    var forecastIconData = data.daily[i].weather[0].icon;
    var forecastHumidityData = 'Humidity: ' + data.daily[i].humidity + '%';
    var forecastWindData = 'Wind: ' + data.daily[i].wind_speed + ' m/hr';

    //Test --> all working with index [0]
    // console.log(forecastTempData);
    // console.log(forecastIconData);
    // console.log(forecastHumidityData);
    // console.log(forecastWindData);

    //Create and fill in forecast data
    var forecastCard = document.createElement('div'); //create forecast card
    forecastCard.setAttribute('class', 'forecast_card');
    var forecastArea = document.getElementById('future_forecast'); //get the empty future_forecast section in HTML
    forecastArea.appendChild(forecastCard); //append forecastCard to future_forecast section

    //Create and fill in forecast data
    var titleDate = document.createElement('h2'); //?Title = date
    titleDate.textContent = '01/01/22' //?
    var forecastTemp = document.createElement('p');//Temp
    forecastTemp.textContent = forecastTempData;
    var forecastIcon = document.createElement('p') //?Icon
    forecastIcon.textContent = 'Icon' //?
    var forecastWind = document.createElement('p');// Wind
    forecastWind.textContent = forecastWindData;
    var forecastHumidity = document.createElement('p'); //Humidity
    forecastHumidity.textContent = forecastHumidityData;

    //Loop through --> appending all the data to forecastCard
    var forecastInfo = [titleDate, forecastTemp, forecastIcon, forecastWind, forecastHumidity];
    for (let i = 0; i < forecastInfo.length; i++) {
      forecastCard.appendChild(forecastInfo[i]);
    };
  }
};

//displayWeather();

//var storeSearchHistory = function (){}

//var displaySearchHistory = function(){}