<<<<<<< HEAD
var searchInputEl = $("#userLocation")
var serachBtnEl = $("#searchButton")
var drinkImgEL = $(".card-img-top")
=======
var searchInputEl = $("#userLocation");
<<<<<<< HEAD
var serachBtnEl = $("#searchButton");
>>>>>>> ac8c66cef142329442f9f198de99b741790deff8
=======
var searchBtnEl = $("#searchButton");
var drinkImgEl = $(".card-img-top");
var drinkTitleEl = $(".card-title");
>>>>>>> 73af3c809d39b4722365ffece419f56fbf3b3631
var latitude;
var longitude;
var query;
var coldTemp;
var warmTemp;
var hotTemp;

//Drink api 
function displayDrink() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 73af3c809d39b4722365ffece419f56fbf3b3631
	var getDrink = {
		"async": true,
		"crossDomain": true,
		"url": "https://the-cocktail-db.p.rapidapi.com/filter.php?i=Gin",
		"method": "GET",
		"headers": {
			"X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
			"X-RapidAPI-Key": "e692b18ceemshac75a665f1c063ap11319ejsnf2e882d220d2"
		}
	};
<<<<<<< HEAD
	$.ajax(getDrink).done(function (response) {
		console.log(response);
		for (let i = 0; i < drinkImgEL.length; i++) {
			const element = array[i];
			
		}
	});
=======
  var getDrink = {
    async: true,
    crossDomain: true,
    url: "https://the-cocktail-db.p.rapidapi.com/filter.php?i=Gin",
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
      "X-RapidAPI-Key": "e692b18ceemshac75a665f1c063ap11319ejsnf2e882d220d2",
    },
  };
  $.ajax(getDrink).done(function (response) {
    console.log(response);
  });
>>>>>>> ac8c66cef142329442f9f198de99b741790deff8
=======
	$.ajax(getDrink).then(function (response) {
		console.log(response);

		for (var i = 0; i < drinkImgEl.length; i++) {
			drinkImgEl[i].setAttribute("src", response.drinks[i].strDrinkThumb)
			drinkTitleEl[i].textContent = response.drinks[i].strDrink
		}
	});
>>>>>>> 73af3c809d39b4722365ffece419f56fbf3b3631
}
displayDrink()

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://the-cocktail-db.p.rapidapi.com/search.php?i=vodka",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
		"X-RapidAPI-Key": "e692b18ceemshac75a665f1c063ap11319ejsnf2e882d220d2"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

//openWeatherMap API
function getCurrentWeather(lat, lon) {
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
		console.log(response);
	});
}

function getCoord(city) {
	var requestUrl =
		"http://api.openweathermap.org/geo/1.0/direct?q=" +
		city +
		"&limit=5&appid=004649559d0d6a8c8744d45cc6ad0de1";

	$.ajax({
		url: requestUrl,
		method: "GET",
	}).then(function (response) {
		latitude = response[0].lat;
		longitude = response[0].lon;
		getCurrentWeather(latitude, longitude);
	});
}

function updateSearch() {
	query = searchInputEl.val();
	localStorage.setItem("city-name", query);
}

searchBtnEl.on("click", function () {
	updateSearch();
	getCoord(localStorage.getItem("city-name"));
	$(".hide").removeClass("hide");
});
