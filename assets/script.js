var searchInputEl = $("#userLocation")
var serachBtnEl = $("#searchButton")
var latitude;
var longitude;
var query;
var coldTemp;
var warmTemp;
var hotTemp;

//Drink api 

function displayDrink(){
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
$.ajax(getDrink).done(function (response) {
	console.log(response);
});
<<<<<<< HEAD

function displayDrink() {
	$("<div/>", {
		"class": "card",
	}).appendTo(body)
=======
>>>>>>> 04b48f3554c04d8b6b4e2ec1b34ba1a77eda6dc2
}

// function displayDrinkImg(){
// 	var getDrinkImg = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url":"https://the-cocktail-db.p.rapidapi.com/filter.php?i=Gin/images/media/drink/vrwquq1478252802.jpg" ,
// 	"method": "GET",
// 	"headers": {
// 		"X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
// 		"X-RapidAPI-Key": "e692b18ceemshac75a665f1c063ap11319ejsnf2e882d220d2"
// 	}
// };
// $.ajax(getDrinkImg).done(function (response) {
// 	console.log(response);
// });
// }


//openWeatherMap API
function getCurrentWeather(lat, lon) {
	var requestUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=004649559d0d6a8c8744d45cc6ad0de1&units=imperial"

	$.ajax({
		url: requestUrl,
		method: "GET",
	}).then(function (response) {
		console.log(response);
	})
}

function getCoord(city) {
	var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=004649559d0d6a8c8744d45cc6ad0de1"

	$.ajax({
		url: requestUrl,
		method: "GET",
	}).then(function (response) {
		latitude = response[0].lat;
		longitude = response[0].lon;
		getCurrentWeather(latitude, longitude);
	})
}

function updateSearch() {
	query = searchInputEl.val();
	localStorage.setItem("city-name", query);
}

serachBtnEl.on("click", function () {
	displayDrink();
	updateSearch();
	displayDrinkImg();
	getCoord(localStorage.getItem("city-name"));
})

