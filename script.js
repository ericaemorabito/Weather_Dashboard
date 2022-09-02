var searchBtn = document.getElementById('search_btn');

//Submit Event
searchBtn.addEventListener('click', function () {
  event.preventDefault();
  //Get the value of the search input
  var searchInputVal = document.getElementById('search_input').value;
  //if nothing in input - error and return
  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
  //Run the promise
  searchApi();
});

//var getParams = function () {}

//API call: https://api.openweathermap.org/data/2.5/onecall/timemachine?lat={lat}&lon={lon}&dt={time}&appid={API key}

var searchApi = function () {
  var apiKey = '928970293a8d368de2efde06eb94ad93'
  //var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=' + lat '&lon= + lon + '&appid=' + apiKey

  fetch(weatherUrl)
    .then(function (response) {
      //If response is bag
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    //IF there is a response
    .then(function (response) {
      if (response.ok) {
        console.log('response okay')
      }
    })
    //If error
    .catch(function (error) {
      console.log(error);
    })
};
searchApi();

var printWeather = function () {
  //set up div for current day's weather
  var weatherCard = document.createElement('div'); //create div for today's weather
  weatherCard.setAttribute('id', 'weather_card');
  var weatherResultsArea = document.getElementById('weather_results'); //section weather results
  weatherResultsArea.appendChild(weatherCard); //append <div> to <section>

  var weatherTitle = document.createElement('h2'); //Title
  var weatherDate = document.createElement('p'); //Date
  var tempAndIcon = document.createElement('p');//Temp and Icon
  var wind = document.createElement('p');// Wind
  var humidity = document.createElement('p'); //Humidity
  var uvIndex = document.createElement('p'); //UV Index
  weatherCard.append(weatherTitle, weatherDate, tempAndIcon, wind, humidity, uvIndex);

  var forecastCard = document.createElement('div'); //create div for forecasts
  forecastCard.setAttribute('id', 'forecast_card');
  var forecastArea = document.getElementById('future_forecast');
  forecastArea.appendChild(forecastCard); //append card to forecast <section>
}

//var storeSearchHistory = function (){}