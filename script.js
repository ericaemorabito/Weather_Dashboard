var searchBtn = document.getElementById('search_btn');
var apiKey = '928970293a8d368de2efde06eb94ad93';
var lat;
var lon;
var searchInputVal;

//Submit Event
searchBtn.addEventListener('click', function () {
  event.preventDefault();
  //Get the value of the search input
  var searchInputVal = document.getElementById('search_input').value;
  console.log(searchInputVal)
  //if nothing in input - error and return
  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
  //Run the search
  searchApi();
});

//var getParams = function () {}

//

//! In progress!
var searchApi = function (searchInputVal) {
  var lat = searchInputVal;
  var lon = searchInputVal;
  var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}`;

  fetch(weatherUrl)
    .then(function (response) {
      //Bad response --> return
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    //Okay response --> log response okay
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

var printWeather = function () {
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
printWeather();

//var storeSearchHistory = function (){}