// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


$(function () {
  var userFormEl = document.querySelector('#user-form');
  var nameInputEl = document.querySelector('#cityname');
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
  function getForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}
      `).then(response => response.json())
      .then(data => {
        var forecastWeather = $(".getForcast")
        forecastWeather.text("")
        // date should appear
        // var forecastImg = $("<img>").addClass("card-img").attr("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        // var forecastTemp=$("<h5>").addClass("card-text").text("Temp:"+ data.main.temp + " C")
        // var forecastHumid=$("<h5>").addClass("card-text").text("Humidity:"+ data.main.humidity)
        // var forecastwind=$("<h5>").addClass("card-text").text("Wind:"+ data.wind.speed)
        //  forcastWeather.append(forecastImg)
        // forecastWeather.append(forecastTemp)
        // forecastWeather.append(forecastHumid)
        // forecastWeather.append(forecastwind)

        console.log(data)
      })
  }
  var value = localStorage.getItem("city") || []
  var formSubmitHandler = function (event) {
    event.preventDefault();
    var cityname = nameInputEl.value.trim();
    localStorage.setItem("city", JSON.stringify(value))
    // value.push(cityname)// why this is not working?
    // console.log(value)
    cityname.textContent = "";
    nameInputEl.value = "";
    getGeo(cityname);
    loadSearches()
  };
  function loadSearches() {
    var data = JSON.parse(localStorage.getItem("city"))
    for (var i = 0; i < data.length; i++) {
      var cityBtn = $("<button>").text(data[i])
      $(".recentSearches").append(cityBtn)
       //cityBtn.on("click", getGeo(city))//--- find out what will search for value ---))
    }
  }

  // Add click events on the save button. This code should
  // use the id in the containing input as a key to save the user input in
  // local storage. 
  // $(".saveBtn").click(function (event) {
  //     event.preventDefault();
  //     var value = $(this).siblings(".description").val();
  //     console.log(value)
  //     localStorage.setItem(city,value);
  //   });

  userFormEl.addEventListener('submit', formSubmitHandler);
});

