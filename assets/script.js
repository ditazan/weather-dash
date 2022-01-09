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
              var currentTemp = String(data.current.temp + "\u00B0 F");
              var currentWind = String(data.current.wind_speed + "mph");
              var currentHum = String(data.current.humidity );
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
  
  ;
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
  $("#current-hum").text("Humidity : " + hum+"%");
  $("#current-uv-span").text( uv);
  uv = parseInt(uv);
  if (uv>6){
     $("#current-uv-span").css("background-color", "#ff5454");
  }else if (uv>2 && uv< 6){
    $("#current-uv-span").css("background-color", "#fff454");
  }else if (uv>0 || uv===0){
    $("#current-uv-span").css("background-color", "#54ff68");
  } else{
    $("#current-uv-span").css("background-color", "none");
  }
};

var displayWeek = function (data) {  
let forecast = [];
let curr = new Date() ;
for ( i = 0; i <= 4; i++) {
    var month = curr.getUTCMonth()+1;
    var day = curr.getUTCDate();
    var date = month + "/"+(day+i+1);

   let forecastInfo={
        date: date,
        wind: data.daily[i].wind_speed,
        temp: data.daily[i].temp.day,
        hum: data.daily[i].humidity,
        uv: data.daily[i].uvi
    }
  forecast.push(forecastInfo);
  console.log(forecast[i]);
$(`.date-${i}`).text(forecast[i].date);
        $(`#temp-${i}`).text("Temp : "+forecast[i].temp+"\u00B0 F");
        $(`#wind-${i}`).text("Wind : "+forecast[i].wind+"mph");
        $(`#hum-${i}`).text("Humidity : "+forecast[i].hum+"%");
        $(`#uv-${i}`).text("UV Index : "+forecast[i].uv);
}
};

// var createDay = function(date, temp, wind, hum, uvi){
//     for (i = 1; i <= 5; i++){
        
//     }
// }
    


var makeForecast = function(){

}

$("form").on("submit", formSubmitHandler);
$("#submit-btn").on("click", formSubmitHandler);
