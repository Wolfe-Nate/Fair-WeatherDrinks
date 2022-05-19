var searchInputEl = $("#userLocation")
var searchBtnEl = $("#searchButton")
var drinkImgEL = $(".card-img-top")
var searchInputEl = $("#userLocation");
var searchInputEl = $(".form-control");
var searchBtnEl = $("#searchButton");
var searchBtnEl = $("#searchButton");
var drinkImgEl = $(".card-img-top");
var drinkTitleEl = $(".card-title");
var drinkInfoEL = $(".card-text");
var drinkIngEl = $(".list-group-item1");
var drinkIngEl2 = $(".list-group-item2");
var drinkIngEl3 = $(".list-group-item3");
var drinkIngEl4 = $(".list-group-item4");
var drinkLink = $(".card-link");
var weatherEl = $(".alert");
var latitude;
var longitude;
var query;
var coldTemp;
var warmTemp;
var hotTemp;

var errorModal = new bootstrap.Modal($("#error"));

//Drink api 
function displayDrink(filter) {
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
		for (var i = 0; i < drinkImgEL.length; i++) {
			var randomNum = Math.floor(Math.random() * response.drinks.length)

			var getDrink = {
				async: true,
				crossDomain: true,
				url: "https://the-cocktail-db.p.rapidapi.com/lookup.php?i=" + response.drinks[randomNum].idDrink,
				method: "GET",
				headers: {
					"X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
					"X-RapidAPI-Key": "e692b18ceemshac75a665f1c063ap11319ejsnf2e882d220d2",
				},
			};

			await $.ajax(getDrink).done(function (response) {
				console.log(response)
				console.log(i)

				drinkImgEl[i].setAttribute("src", response.drinks[0].strDrinkThumb);
				drinkTitleEl[i].textContent = response.drinks[0].strDrink;
				drinkInfoEL[i].textContent = response.drinks[0].strInstructions;
				drinkIngEl[i].textContent = response.drinks[0].strIngredient1;
				drinkIngEl2[i].textContent = response.drinks[0].strIngredient2;
				drinkIngEl3[i].textContent = response.drinks[0].strIngredient3;
				drinkIngEl4[i].textContent = response.drinks[0].strIngredient4;
				drinkLink[i].setAttribute("href", "https://www.thecocktaildb.com/drink/" + response.drinks[0].idDrink);

			});
		}
	});
}

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://the-cocktail-db.p.rapidapi.com/list.php?c=list",
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
		weatherEl.children().eq(0).children().eq(0).text(localStorage.getItem("city-name"));
		weatherEl.children().eq(0).children().eq(1).text(timeConverter(response.sys.sunrise));
		weatherEl.children().eq(2).children().eq(0).text("Temperature: " + response.main.temp + " °F");
		weatherEl.children().eq(2).children().eq(1).text("Feels Like: " + response.main.feels_like + " °F");
		weatherEl.children().eq(2).children().eq(2).attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
		if (response.main.temp < 55) {
			filter = "Coffee%20%2F%20Tea";
		}
		else if (response.main.temp < 80) {
			filter = "Cocktail";
		}
		else {
			filter = "Shake";
		}
		displayDrink(filter);
	});
}

function getCoord(city) {
	var requestUrl =
		"http://api.openweathermap.org/geo/1.0/direct?q=" +
		city +
		"&limit=5&appid=004649559d0d6a8c8744d45cc6ad0de1";

	if (!localStorage.getItem("city-name")) {
		console.log("here")
		errorModal.show();
		return
	}
	$.ajax({
		url: requestUrl,
		method: "GET",
	}).then(function (response) {
		if (response.length === 0) {
			errorModal.show();
			return
		}
		latitude = response[0].lat;
		longitude = response[0].lon;
		getCurrentWeather(latitude, longitude);
	});
}

function timeConverter(timestamp) {
	var now = new Date(timestamp * 1000);
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var year = now.getFullYear();
	var month = months[now.getMonth()];
	var date = now.getDate();
	var time = date + ' ' + month + ' ' + year;
	return time;
}

function updateSearch() {
	query = searchInputEl.val();
	localStorage.setItem("city-name", query);
}

if (localStorage.getItem("city-name")) {
	$(".hide").removeClass("hide");
	getCoord(localStorage.getItem("city-name"))
}

function pushEnter(event) {
	if (event.key === "13") {
		someFunction();
	}
}

searchBtnEl.on("click", function () {
	updateSearch();
	getCoord(localStorage.getItem("city-name"));
	$(".hide").removeClass("hide");
});

$(document).on("keypress", function (e) {
	if (e.which == 13) {
		updateSearch();
		getCoord(localStorage.getItem("city-name"));
		$(".hide").removeClass("hide");
	}
})


