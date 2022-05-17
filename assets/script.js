var searchInputEl = $("#search-input")
var serachBtnEl = $("#9-save")
var lat;
var lon;
var query;

//Drink api 
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://the-cocktail-db.p.rapidapi.com/random.php",
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
function getCurrentWeather(city) {
	var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=004649559d0d6a8c8744d45cc6ad0de1&units=imperial"

	$.ajax({
		url: requestUrl,
		method: "GET",
	}).then(function (response) {
		console.log(response);
	})
}

function updateSearch() {
	query = searchInputEl.val();
	localStorage.setItem("city-name", query);
}

serachBtnEl.on("click", function () {
	updateSearch();
	getCurrentWeather(localStorage.getItem("city-name"));
})

