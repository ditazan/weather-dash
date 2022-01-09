var city = "";

var getWeather = function (city) {
  var apiUrl =
    "https:/api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=974d6d4b79c2f39c89c7118142b74bd7&units=imperial";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        var lat = String(data.coord.lat);
        var lon = String(data.coord.lon);

        var apiURL =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&exclude=hourly,minutely&appid=974d6d4b79c2f39c89c7118142b74bd7&units=imperial";
        fetch(apiURL).then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              console.log(data);
              var currentTemp = String(data.current.temp + "\u00B0 F");
              var currentWind = String(data.current.wind_speed + "mph");
              var currentHum = String(data.current.humidity + " %");
              var currentUV = String(data.current.uvi);
              displayCurrent(
                city,
                currentTemp,
                currentWind,
                currentHum,
                currentUV
              );
              displayWeek(data);
            });
          }
        });
      });
    } else {
      $("#search").effect("bounce", { distance: 5 }, { times: 2 });
    }
  });
};

var formSubmitHandler = function (event) {
  event.preventDefault();
  city = $("#search").val();
  city = city.charAt(0).toUpperCase() + city.slice(1);
  displayCurrent();
  if (!city) {
    console.log("x");
  } else {
    getWeather(city);
    $("#search").val("");
  }
  
};

var displayCurrent = function (city, temp, wind, hum, uv) {
  $("#current-city").text(city);
  $("#current-temp").text("Temp : " + temp);
  $("#current-wind").text("Wind : " + wind);
  $("#current-hum").text("Humidity : " + hum);
  $("#current-uv").text("UV Index : " + uv);
};

var displayWeek = function (data) {
    let curr = new Date() ;
    var month = curr.getUTCMonth() + 1;
let foreCast = [];

for ( i = 0; i <= 4; i++) {
    var result = curr.getUTCDate()+ i +1;
  foreCast.push(new Date(result));
  console.log(foreCast[i]);
//   $(".date-1").text(foreCast[i]);
}
    
};

var makeForecast() = function(){
    
}

$("form").on("submit", formSubmitHandler);
$("#submit-btn").on("click", formSubmitHandler);
