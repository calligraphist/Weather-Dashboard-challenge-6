// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


$(function () {
  var userFormEl = document.querySelector('#user-form');
  var nameInputEl = document.querySelector('#cityname');
  var searchHistory=[];
  //var buttonEl = document.querySelector('#city-buttons');
  var apiKey = "0649bac615e9d5f8978e246ad6508e85"
  function getGeo(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        getWeather(data[0].lat, data[0].lon)
        getForecast(data[0].lat, data[0].lon)
      })
  }
  function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}
      `).then(response => response.json())
      .then(data => {
        console.log(data)
        var currentWeather = $(".currentweather")
        currentWeather.text("")
        var cityInfo = $("<div>").addClass("cityInfo d-flex")
        var cityName = $("<h2>").addClass("card-text mx-3").text(data.name)
        var today = new Date(data.dt * 1000)
        var day = today.getMonth() + 1
        var date = $("<h4>").addClass("card-text").text("(" + day + "/" + today.getDate() + '/' + today.getFullYear() + ")")

        var currentImg = $("<img>").addClass("card-img").attr("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        var currentTemp = $("<h5>").addClass("card-text").text("Temp:" + data.main.temp + " C")
        var currentHumid = $("<h5>").addClass("card-text").text("Humidity:" + data.main.humidity)
        var currentwind = $("<h5>").addClass("card-text").text("Wind:" + data.wind.speed)

        cityInfo.append(cityName)
        cityInfo.append(date)
        currentWeather.append(cityInfo)
        currentWeather.append(currentImg)
        currentWeather.append(currentTemp)
        currentWeather.append(currentHumid)
        currentWeather.append(currentwind)

      })
  }
//   var fiveDayForecastSection = function(cityName) {
//     // get and use data from open weather current weather api end point
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
//         // get response and turn it into objects
//         .then(function(response) {
//             return response.json();
//         })
//         .then(function(response) {
//             // get city's longitude and latitude
//             var cityLon = response.coord.lon;
//             var cityLat = response.coord.lat;

//             fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`)
//                 // get response from one call api and turn it into objects
//                 .then(function(response) {
//                     return response.json();
//                 })
//                 .then(function(response) {
//                     console.log(response);

//                     // add 5 day forecast title
//                     var futureForecastTitle = $("#future-forecast-title");
//                     futureForecastTitle.text("5-Day Forecast:")

//                     // using data from response, set up each day of 5 day forecast
//                     for (var i = 1; i <= 5; i++) {
//                         // add class to future cards to create card containers
//                         var futureCard = $(".future-card");
//                         futureCard.addClass("future-card-details");

//                         // add date to 5 day forecast
//                         var futureDate = $("#future-date-" + i);
//                         date = moment().add(i, "d").format("M/D/YYYY");
//                         futureDate.text(date);

//                         // add icon to 5 day forecast
//                         var futureIcon = $("#future-icon-" + i);
//                         futureIcon.addClass("future-icon");
//                         var futureIconCode = response.daily[i].weather[0].icon;
//                         futureIcon.attr("src", `https://openweathermap.org/img/wn/${futureIconCode}@2x.png`);

//                         // add temp to 5 day forecast
//                         var futureTemp = $("#future-temp-" + i);
//                         futureTemp.text("Temp: " + response.daily[i].temp.day + " \u00B0F");

//                         // add humidity to 5 day forecast
//                         var futureHumidity = $("#future-humidity-" + i);
//                         futureHumidity.text("Humidity: " + response.daily[i].humidity + "%");
//                     }
//                 })
//         })
// };
  function getForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}
      `).then(response => response.json())
      .then(data => {
        var forecastWeather = document.createElement("div")
        console.log(forecastWeather)
        $('<div/>',{
       class: 'future-forecast-container'
      }).appendTo('#parentDiv');
        $(".future-forecast-container").append(forecastWeather);
        console.log("5day", data)
        for (i=0; i<= 5; i++){
        //date should appear
        var forecastImg = $("<img>").addClass("card-img").attr("src", `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`)
        var forecastTemp=$("<h5>").addClass("card-text").text("Temp:"+ data.list[0].main.temp + " C")
        var forecastHumid=$("<h5>").addClass("card-text").text("Humidity:"+ data.list[0].main.humidity)
        var forecastwind=$("<h5>").addClass("card-text").text("Wind:"+ data.list[0].wind.speed)
        console.log(forecastImg)
        forecastWeather.append(forecastImg)
        forecastWeather.append(forecastTemp)
        forecastWeather.append(forecastHumid)
        forecastWeather.append(forecastwind)
     
        }
      })
  }
  var value = localStorage.getItem("city") || []
  var formSubmitHandler = function (event) {
    event.preventDefault();
    var cityname = nameInputEl.value.trim();
    console.log(cityname)
    
    searchHistory.push(cityname);
    console.log(searchHistory)
    localStorage.setItem('city', JSON.stringify(searchHistory));
   // localStorage.setItem("city", JSON.stringify(cityname))
    cityname.textContent = "";
    nameInputEl.value = "";
    getGeo(cityname);
    loadSearches()
  };
  function loadSearches() {
    var data = JSON.parse(localStorage.getItem("city"))
    for (let i= 0; i < data.length; i++) {
       var cityBtn = $("<button>").text(data[i])
       //$(".recentSearches").empty();
      $(".recentSearches").append(cityBtn)
      //cityBtn.on("click", getGeo(cityname))//--- find out what will search for value ---))
    }
  }


  userFormEl.addEventListener('submit', formSubmitHandler);
 // buttonEl.addEventListener('click',  buttonClickHandler);
});
