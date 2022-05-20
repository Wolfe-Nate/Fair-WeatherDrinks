var searchInputEl = $("#userLocation");
var searchBtnEl = $("#searchButton");
var drinkImgEL = $(".card-img-top");
var searchInputEl = $(".form-control");
var searchBtnEl = $("#searchButton");
var checkedEl = $("#check");
var drinkImgEl = $(".card-img-top");
var drinkTitleEl = $(".card-title");
var drinkInfoEL = $(".card-text");
var drinkIngEl = $(".list-group-item1");
var drinkIngEl2 = $(".list-group-item2");
var drinkIngEl3 = $(".list-group-item3");
var drinkIngEl4 = $(".list-group-item4");
var drinkLink = $(".card-link");
var weatherEl = $(".alert");
var cityEl = $("#city");
var dateEl = $("#date");
var currentTempEl = $("#temp");
var feelsLikeTempEl = $("#feels-like");
var weatherIconEl = $("#weather-icon");
var latitude;
var longitude;
var query;
var checked;
var coldTemp;
var warmTemp;
var hotTemp;
var drinkId;
var i;

var errorModal = new bootstrap.Modal($("#error"));

//Drink api
function filterDrinks(filter) {
  var getId = {
    async: true,
    crossDomain: true,
    url: "https://the-cocktail-db.p.rapidapi.com/filter.php?c=" + filter,
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
      "X-RapidAPI-Key": "e692b18ceemshac75a665f1c063ap11319ejsnf2e882d220d2",
    },
  };

  $.ajax(getId).done(async function (response) {
    for (i = 0; i < drinkImgEl.length; i++) {
      var randomNum = Math.floor(Math.random() * response.drinks.length);
      var drink = response.drinks.splice(randomNum, 1);
      console.log(drink);
      id = drink[0].idDrink;
      displayDrink(drinkId);
      var getDrink = {
        async: true,
        crossDomain: true,
        url: "https://the-cocktail-db.p.rapidapi.com/lookup.php?i=" + id,
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
          "X-RapidAPI-Key":
            "e692b18ceemshac75a665f1c063ap11319ejsnf2e882d220d2",
        },
      };

      await $.ajax(getDrink).done(function (response) {
        console.log(i);
        console.log(response);
        drinkImgEl[i].setAttribute("src", response.drinks[0].strDrinkThumb);
        drinkTitleEl[i].textContent = response.drinks[0].strDrink;
        drinkInfoEL[i].textContent = response.drinks[0].strInstructions;
        drinkIngEl[i].textContent = response.drinks[0].strIngredient1;
        drinkIngEl2[i].textContent = response.drinks[0].strIngredient2;
        drinkIngEl3[i].textContent = response.drinks[0].strIngredient3;
        drinkIngEl4[i].textContent = response.drinks[0].strIngredient4;
        drinkLink[i].setAttribute(
          "href",
          "https://www.thecocktaildb.com/drink/" + response.drinks[0].idDrink
        );
      });
    }
  });
}

//openWeatherMap API
//gets weather at latitude and longitude of input city
function getCurrentWeather(lat, lon) {
  var filter;
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=004649559d0d6a8c8744d45cc6ad0de1&units=imperial";

  $.ajax({
    url: requestUrl,
    method: "GET",
  }).then(function (response) {
    //displays current weather
    cityEl.text(localStorage.getItem("city-name"));
    dateEl.text(timeConverter(response.sys.sunrise));
    currentTempEl.text("Temperature: " + response.main.temp + " °F");
    feelsLikeTempEl.text("Feels Like: " + response.main.feels_like + " °F");
    weatherIconEl.attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        response.weather[0].icon +
        "@2x.png"
    );
    //define filter criteria;
    if (response.main.temp < 55) {
      sifter = "Coffee%20%2F%20Tea";
    } else if (response.main.temp < 80) {
      sifter = "Cocktail";
    } else {
      sifter = "Shake";
    }
    filterDrinks(sifter);
  });
}

// gets coordinates for input city
function getCoord(city) {
  var requestUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=5&appid=004649559d0d6a8c8744d45cc6ad0de1";

  // shows modal if local storage is empty
  if (!localStorage.getItem("city-name")) {
    errorModal.show();
    return;
  }
  //API call
  $.ajax({
    url: requestUrl,
    method: "GET",
  }).then(function (response) {
    // if typo in city, show modal
    if (response.length === 0) {
      errorModal.show();
      return;
    }
    localStorage.setItem("city-name", response[0].name);
    latitude = response[0].lat;
    longitude = response[0].lon;
    getCurrentWeather(latitude, longitude);
  });
}

function timeConverter(timestamp) {
  var now = new Date(timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = now.getFullYear();
  var month = months[now.getMonth()];
  var date = now.getDate();
  var time = date + " " + month + " " + year;
  return time;
}

function updateSearch() {
  query = searchInputEl.val();
  if (!checkedEl.is(":checked")) {
    checked = "Alcoholic";
  } else {
    checked = "Non Alcoholic";
  }
}

if (localStorage.getItem("city-name")) {
  $(".hide").removeClass("hide");
  getCoord(localStorage.getItem("city-name"));
}

function pushEnter(event) {
  if (event.key === "13") {
  }
}

searchBtnEl.on("click", function () {
  updateSearch();
  getCoord(query);
  $(".hide").removeClass("hide");
});

$(document).on("keypress", function (e) {
  if (e.which == 13) {
    updateSearch();
    getCoord(query);
    $(".hide").removeClass("hide");
    window.location.href = "#weather";
  }
});
