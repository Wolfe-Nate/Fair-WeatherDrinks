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
var checked = "Alcoholic";
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
    var drinkCount = 0;
    while (drinkCount < 4) {
      var randomNum = Math.floor(Math.random() * response.drinks.length);
      var drink = response.drinks.splice(randomNum, 1);
      id = drink[0].idDrink;
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
        if (response.drinks[0].strAlcoholic === checked) {
          drinkImgEl[drinkCount].setAttribute(
            "src",
            response.drinks[0].strDrinkThumb
          );
          drinkTitleEl[drinkCount].textContent = response.drinks[0].strDrink;
          drinkInfoEL[drinkCount].textContent =
            response.drinks[0].strInstructions;
          drinkIngEl[drinkCount].textContent =
            response.drinks[0].strIngredient1;
          drinkIngEl2[drinkCount].textContent =
            response.drinks[0].strIngredient2;
          drinkIngEl3[drinkCount].textContent =
            response.drinks[0].strIngredient3;
          drinkIngEl4[drinkCount].textContent =
            response.drinks[0].strIngredient4;
          drinkLink[drinkCount].setAttribute(
            "href",
            "https://www.thecocktaildb.com/drink/" + response.drinks[0].idDrink
          );
          drinkCount++;
        }
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

<<<<<<< HEAD
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
    console.log(response);
    d;
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
=======

	//API call
	$.ajax({
		url: requestUrl,
		method: "GET",
	}).then(function (response) {
		// if typo in city, show modal
		if (response.length === 0) {
			errorModal.show();
			return
		}
		localStorage.setItem("city-name", response[0].name);
		latitude = response[0].lat;
		longitude = response[0].lon;
		getCurrentWeather(latitude, longitude);
	});
>>>>>>> 384363993e80e3608e8449b298e1edbab4ad3c12
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
<<<<<<< HEAD
  query = searchInputEl.val();
  console.log(checkedEl.is(":checked"));
  if (checkedEl.is(":checked")) {
    checked = "Non Alcoholic";
    console.log(checked);
  }
=======
	query = searchInputEl.val();
	if (checkedEl.is(":checked")) {
		checked = "Non Alcoholic";
	}
>>>>>>> 384363993e80e3608e8449b298e1edbab4ad3c12
}

if (localStorage.getItem("city-name")) {
  $(".hide").removeClass("hide");
  getCoord(localStorage.getItem("city-name"));
}

function pushEnter(event) {
  if (event.key === "13") {
  }
}

<<<<<<< HEAD
searchBtnEl.on("click", function () {
  updateSearch();
  getCoord(query);
  $(".hide").removeClass("hide");
});

$(document).on("keypress", function (e) {
  if (e.which == 13) {
    updateSearch();
    getCoord(query);
    window.location.href = "#weather";
    $(".hide").removeClass("hide");
  }
});
=======
$("#form").on("submit", function () {
	updateSearch();
	// shows modal if local storage is empty
	if (searchInputEl.val().length === 0) {
		errorModal.show();
		return
	}
	getCoord(query);
	window.location.href = "#weather";
	$(".hide").removeClass("hide");
});

// $(document).on("keypress", function (e) {
// 	if (e.which == 13) {
// 		updateSearch();
// 		getCoord(query);
// 		window.location.href = "#weather";
// 		$(".hide").removeClass("hide");
// 	}
// })
>>>>>>> 384363993e80e3608e8449b298e1edbab4ad3c12
