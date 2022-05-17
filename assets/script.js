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
