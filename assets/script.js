//Tasty Api 
//showing on console 
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://tasty.p.rapidapi.com/feeds/list?size=5&timezone=%2B0700&vegetarian=false&from=0",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Host": "tasty.p.rapidapi.com",
		"X-RapidAPI-Key": "9fa8565476mshd3470bfe50d4b8ep13befajsnb3b5e303b3f3"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});