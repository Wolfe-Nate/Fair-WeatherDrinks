//Tasty Api 
//showing on console 
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://tasty.p.rapidapi.com/recipes/list?from=0&size=40&tags=under_30_minutes",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Host": "tasty.p.rapidapi.com",
		"X-RapidAPI-Key": "9fa8565476mshd3470bfe50d4b8ep13befajsnb3b5e303b3f3"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});


//openWeatherMap API
function getCurrentWeather(lat, lon) {
	var requestUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=004649559d0d6a8c8744d45cc6ad0de1"

	$.ajax({
		url: requestUrl,
		method: "GET",
	}).then(function (response) {
		console.log(response);
	})
}

getCurrentWeather(41.649212, -87.472565)