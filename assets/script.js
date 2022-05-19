
var searchInputEl = $("#userLocation")
var searchBtnEl = $("#searchButton")
var drinkImgEL = $(".card-img-top")
var searchInputEl = $("#userLocation");
var searchInputEl = $(".form-control");
var searchBtnEl = $("#searchButton");
var searchBtnEl = $("#searchButton");
var drinkImgEl = $(".card-img-top");
var drinkTitleEl = $(".card-title");
var drinkInfoEL = $(".card-text")
var drinkIngEl = $(".list-group-item1")
var drinkIngEl2 = $(".list-group-item2")
var drinkIngEl3 = $(".list-group-item3")
var drinkIngEl4 = $(".list-group-item4")
var weatherEl = $(".alert");
var latitude;
var longitude;
var query;
var coldTemp;
var warmTemp;
var hotTemp;

var errorModal = new bootstrap.Modal($("#error"))

//Drink api 
function displayDrink() {

	var getDrink = {
		"async": true,
		"crossDomain": true,
		"url": "https://the-cocktail-db.p.rapidapi.com/randomselection.php",
		"method": "GET",
		"headers": {
			"X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
			"X-RapidAPI-Key": "e692b18ceemshac75a665f1c063ap11319ejsnf2e882d220d2"
		}
	};

	$.ajax(getDrink).done(function (response) {
		console.log(response);
		for (var i = 0; i < drinkImgEL.length; i++) {
			const element = getDrink[i];
			
		}
	});

var getDrink = {
    async: true,
    crossDomain: true,
    url: "https://the-cocktail-db.p.rapidapi.com/randomselection.php",
    method: "GET",
    headers: {
    "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
    "X-RapidAPI-Key": "e692b18ceemshac75a665f1c063ap11319ejsnf2e882d220d2",
    },
};
$.ajax(getDrink).done(function (response) {

		for (var i = 0; i < Array.length; i++) {
		}
	});

	$.ajax(getDrink).then(function (response) {


		for (var i = 0; i < drinkImgEl.length; i++) {
			drinkImgEl[i].setAttribute("src", response.drinks[i].strDrinkThumb)
			drinkTitleEl[i].textContent = response.drinks[i].strDrink
			drinkInfoEL[i].textContent = response.drinks[i].strInstructions
			drinkIngEl[i].textContent = response.drinks[i].strIngredient1
			drinkIngEl2[i].textContent = response.drinks[i].strIngredient2
			drinkIngEl3[i].textContent = response.drinks[i].strIngredient3
			drinkIngEl4[i].textContent = response.drinks[i].strIngredient4
		}
	});
	
}
displayDrink()

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
		console.log(weatherEl.children().eq(2).children().eq(1));
		weatherEl.children().eq(0).children().eq(0).text(localStorage.getItem("city-name"));
		weatherEl.children().eq(0).children().eq(1).text(timeConverter(response.sys.sunrise));
		weatherEl.children().eq(2).children().eq(0).text("Temperature: " + response.main.temp + " °F");
		weatherEl.children().eq(2).children().eq(1).text("Feels Like: " + response.main.feels_like + " °F");
		weatherEl.children().eq(2).children().eq(2).attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");

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
		console.log(response)
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
	weatherEl.removeClass("hide");
	getCoord(localStorage.getItem("city-name"))
}

searchBtnEl.on("click", function () {
	updateSearch();
	getCoord(localStorage.getItem("city-name"));
	$(".hide").removeClass("hide");
});


