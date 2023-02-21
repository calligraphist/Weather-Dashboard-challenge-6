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
        var currentWeather=$(".currentweather")
        var currentTemp=$("<h5>").addClass("card-text").text("Temp:"+ data.main.temp)
        currentWeather.append(currentTemp)
      })
  }
  function getForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}
      `).then(response => response.json())
      .then(data => {
        console.log(data)
      })
  }
  var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityname = nameInputEl.value.trim();
    console.log(cityname);
    getGeo(cityname);
    // if (username) {
    //   getUserRepos(username);

    //   repoContainerEl.textContent = '';
    //   nameInputEl.value = '';
    // } else {
    //   alert('Please enter a GitHub username');
    // }
  };

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